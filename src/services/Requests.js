import store from '../store/index'

const app = store.getState()

const ls = JSON.parse(window.localStorage.getItem('admin'))
const auth = JSON.parse(ls.auth)

const URL_API = 'http://localhost:4000'
const idUser = app.auth.user.id ? app.auth.user.id : auth.user.id

export const getUser = async () => {
    try {
        const resp = await fetch(URL_API + '/api/users/' + idUser)
        const data = await resp.json()
        return data.response
    } catch (error) {
        console.error('Error:', error)
        throw new Error('No se pudo obtener los datos del usuario.')
    }
}

export const editBusinessInfo = async (
    businessName,
    businessModel,
    currency,
    imagePath
) => {
    try {
        const formData = new FormData()
        formData.append('businessName', businessName)
        formData.append(
            'businessInfo',
            JSON.stringify([{ businessModel, currency }])
        )
        formData.append('image', imagePath)

        const response = await fetch(URL_API + '/api/users/' + idUser, {
            method: 'PUT',
            body: formData,
        })

        const data = await response.json()
        return data
    } catch (error) {
        if (error.response) {
            console.error(error.response.data)
            console.error(error.response.status)
            console.error(error.response.headers)
        } else if (error.request) {
            console.error(error.request)
        } else {
            console.error('Error', error.message)
        }
        throw error
    }
}

export const createAssumpVenta = async (canales, churns, paises, productos) => {
    try {
        const response = await fetch(URL_API + '/api/assumpventa', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                canales: canales,
                churns: churns,
                paises: paises,
                productos: productos,
                idUser: idUser,
            }),
        })
        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error', error.message)
        throw error
    }
}

export const createVolumen = async (body) => {
    try {
        const response = await fetch(`/volumen`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                volumen: body,
                idUser: idUser,
            }),
        })
        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error', error)
        throw error
    }
}

export const createBienes = async (body) => {
    try {
        const response = await fetch(`/bienes`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                bienes: body,
                idUser: idUser,
            }),
        })
        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error', error)
        throw error
    }
}

export const createCosto = async (body) => {
    try {
        const response = await fetch(`/costo`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                costo: body,
                idUser: idUser,
            }),
        })
        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error', error)
        throw error
    }
}

export const createGastos = async (body) => {
    try {
        const response = await fetch(`/gastos`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                gastos: body,
                idUser: idUser,
            }),
        })
        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error', error)
        throw error
    }
}

export const createPrecio = async (body) => {
    try {
        const response = await fetch(`/precio`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                precio: body,
                idUser: idUser,
            }),
        })
        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error', error)
        throw error
    }
}

export const createPuestosq = async (body) => {
    try {
        const response = await fetch('/Puestosq', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Puestosq: body,
                idUser: idUser,
            }),
        })
        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error', error.message)
        throw error
    }
}

export const createPuestosv = async (body) => {
    try {
        const response = await fetch('/puestosv', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                puestosv: body,
                idUser: idUser,
            }),
        })
        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error', error.message)
        throw error
    }
}

export const createAssumpFinanciera = async (
    cobranzas,
    pagoProducto,
    pagoServicio,
    stock,
    inversion
) => {
    try {
        const response = await fetch(URL_API + '/api/assumpfinanciera', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                cobranzas,
                pagoProducto,
                pagoServicio,
                stock,
                inversion,
                idUser: idUser,
            }),
        })
        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error', error.message)
        throw error
    }
}
