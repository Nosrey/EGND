import ContainerScrollable from 'components/shared/ContainerScrollable';
import { Alert, FormContainer, Tabs } from 'components/ui';
import { AÑOS } from 'constants/forms.constants';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUser } from 'services/Requests';
import MySpinner from 'components/shared/loaders/MySpinner';
import { sanitizarDatosVolumen, detectarValoresExtremos } from 'utils/sanitizeVolume';
import TableVolumen from './TableVolumen';

const { TabNav, TabList } = Tabs;

// Función para imprimir datos de volumen en formato más legible
const mostrarDatosVolumen = (datos, origen) => {
  console.log(`\n📊 DATOS DE VOLUMEN (${origen}):`);
  
  if (!datos) {
    console.log('  ❌ No hay datos para mostrar');
    return;
  }
  
  // Para datos de volumenData
  if (datos.volumenData && Array.isArray(datos.volumenData)) {
    console.log(`📌 MOSTRANDO VOLUMEN DATA (${datos.volumenData.length} países):`);
    
    // Mostrar datos reales de volumen para cada país
    datos.volumenData.forEach((pais, iPais) => {
      if (!pais.stats) return;
      
      console.log(`\n🌎 PAÍS: ${pais.countryName}`);
      
      pais.stats.forEach((canal, iCanal) => {
        if (!canal.productos) return;
        
        console.log(`  📢 CANAL: ${canal.canalName}`);
        
        canal.productos.forEach((producto, iProd) => {
          if (!producto.años) return;
          
          console.log(`    📦 PRODUCTO: ${producto.name || producto.id}`);
          console.log(`      Volumen Inicial: ${producto.volInicial} | Tasa: ${producto.tasa}%`);
          
          producto.años.forEach((año, iAño) => {
            if (!año.volMeses) return;
            
            console.log(`      📅 AÑO ${año.año}: volTotal = ${año.volTotal}`);
            
            // Mostrar todos los valores de los meses
            console.log('      VALORES MENSUALES:');
            const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 
                          'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
            
            let lineaMeses = '      ';
            meses.forEach(mes => {
              const valor = año.volMeses[mes];
              lineaMeses += `${mes.substring(0,3)}: ${valor}  `;
            });
            console.log(lineaMeses);
            
            // Si hay un valor extremo, mostrarlo destacado
            const valoresExtremos = meses.filter(mes => año.volMeses[mes] === 270000000);
            if (valoresExtremos.length > 0) {
              console.log(`      ⚠️ VALORES EXTREMOS DETECTADOS: ${valoresExtremos.join(', ')}`);
            }
          });
        });
      });
    });
  }
  
  // Para datos de estructura creada localmente
  if (Object.keys(datos).length > 0 && !datos.volumenData) {
    console.log(`\n📌 MOSTRANDO DATOS LOCALES (${Object.keys(datos).length} países):`);
    
    Object.keys(datos).forEach(paisKey => {
      const canales = datos[paisKey];
      if (!Array.isArray(canales)) return;
      
      console.log(`\n🌎 PAÍS: ${paisKey}`);
      
      canales.forEach((canal, iCanal) => {
        if (!canal.productos) return;
        
        console.log(`  📢 CANAL: ${canal.canalName}`);
        
        canal.productos.forEach((producto, iProd) => {
          if (!producto.años) return;
          
          console.log(`    📦 PRODUCTO: ${producto.name || producto.id}`);
          console.log(`      Volumen Inicial: ${producto.volInicial} | Tasa: ${producto.tasa}%`);
          
          producto.años.forEach((año, iAño) => {
            if (!año.volMeses) return;
            
            console.log(`      📅 AÑO ${año.año}: volTotal = ${año.volTotal}`);
            
            // Mostrar todos los valores de los meses
            console.log('      VALORES MENSUALES:');
            const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 
                          'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
            
            let lineaMeses = '      ';
            meses.forEach(mes => {
              const valor = año.volMeses[mes];
              lineaMeses += `${mes.substring(0,3)}: ${valor}  `;
            });
            console.log(lineaMeses);
            
            // Si hay un valor extremo, mostrarlo destacado
            const valoresExtremos = meses.filter(mes => año.volMeses[mes] === 270000000);
            if (valoresExtremos.length > 0) {
              console.log(`      ⚠️ VALORES EXTREMOS DETECTADOS: ${valoresExtremos.join(', ')}`);
            }
          });
        });
      });
    });
  }
  
  // Mostrar resumen de valores extremos
  const { conteo, ubicaciones } = detectarValoresExtremos(datos);
  
  console.log(`\n📊 RESUMEN: ${conteo} valores extremos encontrados`);
  
  if (conteo > 0) {
    console.log('📍 Detalle de valores extremos:');
    ubicaciones.forEach((ubicacion, i) => {
      console.log(`  ${i+1}) País: ${ubicacion.pais}, Canal: ${ubicacion.canal}, Producto: ${ubicacion.producto}, Año: ${ubicacion.año}, Mes: ${ubicacion.mes}`);
    });
  }
};

function VolumenQ() {
  const [info, setInfo] = useState(null);
  const [defaultCountry, setDefaultCountry] = useState('');
  const [infoForm, setInfoForm] = useState();
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [country, setCountry] = useState(defaultCountry);
  const currentState = useSelector((state) => state.auth.user);
  const [products, setProducts] = useState([]);
  const [showLoader, setShowLoader] = useState(true);

  // Efecto para inicializar datos cuando no hay información previa
  useEffect(() => {
    let estructura = {};
    if (info && info[0]) {
      console.log('🔄 Creando estructura inicial desde info[0]');
      setProducts(info[0].productos);
      for (let i = 0; i < info[0]?.paises.length; i++) {
        let productos = [];
        const realProds = info[0]?.productos;
        for (let x = 0; x < realProds.length; x++) {
          let prod = {};
          prod.id = realProds[x].id;
          prod.volInicial = 0;
          prod.tasa = 0;
          prod.name = realProds[x].name;
          prod.type = realProds[x].type;
          prod.inicioMes = 1;
          prod.fecha = '';
          prod['años'] = [...AÑOS];
          productos.push(prod);
        }
        let canales = [];
        for (let x = 0; x < info[0]?.canales.length; x++) {
          let canal = {};
          canal.canalName = info[0]?.canales[x].name;
          canal.productos = [...productos];
          canales.push(canal);
        }
        estructura[info[0]?.paises[i].value] = [...canales];
      }
      console.log('✅ Estructura inicial creada (info[0])');
      
      // Sanitizar la estructura antes de pasarla al estado
      const estructuraSanitizada = sanitizarDatosVolumen(estructura);
      console.log('✅ Estructura inicial creada y sanitizada (info[0])');
      
      // Inspeccionar la estructura creada
      mostrarDatosVolumen(estructuraSanitizada, 'estructura inicial sanitizada');
      
      setInfoForm(() => ({ ...estructuraSanitizada }));
    }
  }, [info]);

  // Efecto para cargar datos del servidor
  useEffect(() => {
    getUser(currentState.id)
      .then((data) => {
        console.log('📡 Datos recibidos de getUser()');
        
        // Inspeccionar datos crudos recibidos
        mostrarDatosVolumen(data, 'datos del servidor');
        
        if (data?.volumenData && data?.volumenData.length !== 0) {
          console.log('🔄 Usando datos precargados de volumenData');
          // tengo info precargada
          const datosPrecargados = {};
          let volDataOrdenada = data?.volumenData.sort((a, b) =>
            a.countryName.localeCompare(b.countryName),
          );
          for (let i = 0; i < volDataOrdenada.length; i++) {
            datosPrecargados[volDataOrdenada[i].countryName] =
              volDataOrdenada[i].stats;
          }
          
          // Sanitizar los datos precargados
          const datosPrecargadosSanitizados = sanitizarDatosVolumen(datosPrecargados);
          
          // Inspeccionar los datos precargados procesados
          mostrarDatosVolumen(datosPrecargadosSanitizados, 'datos precargados sanitizados');
          
          setInfoForm(() => ({ ...datosPrecargadosSanitizados }));
          setProducts(data?.assumptionData[0].productos);
        } else {
          console.log('🔄 No hay datos precargados, usando assumptionData');
          // no tengo info precargada
          setInfo(data?.assumptionData);
        }
        setDefaultCountry(data?.assumptionData[0]?.paises[0]?.value);
        setCountry(data?.assumptionData[0]?.paises[0]?.value);

        setShowLoader(false);
      })
      .catch((error) => console.error('❌ Error en getUser():', error));
  }, []);

  // Efecto para inspeccionar datos finales antes de renderizar
  useEffect(() => {
    if (infoForm) {
      console.log('🔄 infoForm actualizado - Datos que se envían a TableVolumen:');
      mostrarDatosVolumen(infoForm, 'infoForm final');
    }
  }, [infoForm]);

  return (
    <div>
      {showSuccessAlert && (
        <Alert className="mb-4" type="success" showIcon>
          Los datos se guardaron satisfactoriamente.
        </Alert>
      )}
      {showErrorAlert && (
        <Alert className="mb-4" type="danger" showIcon>
          No se pudieron guardar los datos.
        </Alert>
      )}
      {showLoader ? (
        <MySpinner />
      ) : (
        <>
          <div className="border-b-2 mb-8 pb-1">
            <h4 className="cursor-default">Cantidad y Volumen</h4>
            <span className="cursor-default">Plan de ventas</span>
          </div>
          <div className="border-solid border-2 border-#e5e7eb rounded-lg relative">
            <div className="border-b-2 px-4 py-1">
              <h6 className="cursor-default">Carga de productos / servicios</h6>
            </div>
            {infoForm ? (
              <Tabs defaultValue={defaultCountry}>
                <TabList>
                  {infoForm &&
                    Object.keys(infoForm).map((pais, index) => (
                      <TabNav key={index} value={pais}>
                        <div
                          className="capitalize"
                          onClick={() => setCountry(pais)}
                        >
                          {pais}
                        </div>
                      </TabNav>
                    ))}
                </TabList>
                {infoForm && (
                  <div className="container-countries">
                    <FormContainer className="cont-countries">
                      <ContainerScrollable
                        contenido={
                          <TableVolumen
                            data={infoForm}
                            productos={products}
                            showAlertSuces={(boolean) =>
                              setShowSuccessAlert(boolean)
                            }
                            showAlertError={(boolean) =>
                              setShowErrorAlert(boolean)
                            }
                            country={country}
                          />
                        }
                      />
                    </FormContainer>
                  </div>
                )}
              </Tabs>
            ) : (
              <div className="py-[25px] bg-[#F6F6F5] flex justify-center rounded-lg mb-[30px]  mt-[30px] ml-[30px] mr-[30px]">
                <span className="text-center cursor-default">
                  Para acceder a este formulario primero debe completar el
                  formulario de{' '}
                  <Link
                    className="text-indigo-700 underline"
                    to="/supuestos-ventas"
                  >
                    Supuestos de Ventas
                  </Link>
                  .
                </span>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default VolumenQ;
