import { Card, Progress } from 'components/ui';
import { useEffect, useState } from 'react';
import { useMedia } from 'utils/hooks/useMedia';
import './scrollBar.css';

function ProgresoCircularScroll({ title, churnProducto }) {
  const media = useMedia();
  const [percent, setPercent] = useState(0);

  console.log('churn', churnProducto);

  useEffect(() => {
    let sum = 0;
    churnProducto.churns.map((c) => {
      c.items.map((i) => {
        sum += Number(i.porcentajeChurn);
        setPercent(
          (
            sum /
            (churnProducto.canales.length * churnProducto.productos.length)
          ).toFixed(1),
        );
      });
    });
  }, []);

  return (
    <Card className={`${media === 'mobile' ? 'w-[100%]' : 'w-[50%]'}`}>
      <div>
        <span className="text-lg">{title}</span>
        <div className="flex justify-center gap-[25px] mt-[10px]">
          <Progress
            className="md:mb-0 md:mr-4 mb-4 contents"
            variant="circle"
            color="emerald-400"
            percent={percent}
          />
          <div className="max-h-[200px] overflow-y-auto custom-scrollbar pr-[8px]">
            {churnProducto.canales.map((churn, index) => (
              <div key={index} className="md:mb-0 mb-4 mx-6">
                <span className="font-bold">{churn.name.toUpperCase()}</span>
                {churnProducto.churns[index].items.map((item, indxChurn) => (
                  <div key={indxChurn} className="md:mb-0 mb-4 mx-6">
                    <span className="cursor-default">
                      {`${churnProducto.productos[
                        indxChurn
                      ].name.toUpperCase()} ${Number(
                        item.porcentajeChurn,
                      ).toFixed(1)}%`}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}

export default ProgresoCircularScroll;
