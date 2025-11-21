// stores/geolocationStore.ts
import { create } from 'zustand'

interface GeolocationState {
  coordinates: {
    latitude: number
    longitude: number
  } | null
  error: string | null
  loading: boolean
  fetchPosition: () => void
}

export const useGeolocationStore = create<GeolocationState>((set) => ({
  coordinates: null,
  error: null,
  loading: false,
  fetchPosition: () => {
    if (typeof window === 'undefined' || !navigator.geolocation) {
      set({ error: 'Geolocalização não suportada pelo ambiente', loading: false })
      return
    }

    set({ loading: true, error: null })

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        set({
          coordinates: {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          },
          loading: false,
        })
      },
      (err) => {
        let message = 'Erro desconhecido'
        switch (err.code) {
          case err.PERMISSION_DENIED:
            message = 'Permissão negada pelo usuário'
            break
          case err.POSITION_UNAVAILABLE:
            message = 'Informação de localização indisponível'
            break
          case err.TIMEOUT:
            message = 'Tempo de requisição expirou'
            break
        }
        set({ error: message, loading: false })
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    )
  },
}))
