'use client'

import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

export interface MapMarker {
  lat: number
  lng: number
  title: string
  subtitle?: string
}

interface MapViewProps {
  markers: MapMarker[]
  center?: [number, number]
  zoom?: number
  className?: string
  height?: string
}

export default function MapView({ markers, center, zoom = 10, className = '', height = '100%' }: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return

    const mapCenter = center ?? (markers.length > 0 ? [markers[0].lat, markers[0].lng] : [43.6532, -79.3832]) as [number, number]

    const map = L.map(mapRef.current, {
      center: mapCenter,
      zoom,
      zoomControl: true,
      scrollWheelZoom: true,
    })

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map)

    const icon = L.divIcon({
      className: '',
      html: `<div style="background:#c8a84e;width:12px;height:12px;border-radius:50%;border:3px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,0.4)"></div>`,
      iconSize: [12, 12],
      iconAnchor: [6, 6],
      popupAnchor: [0, -10],
    })

    markers.forEach((m) => {
      const marker = L.marker([m.lat, m.lng], { icon }).addTo(map)
      if (m.title) {
        marker.bindPopup(`
          <div style="font-family:system-ui,sans-serif;min-width:120px">
            <strong style="font-size:14px;color:#111">${m.title}</strong>
            ${m.subtitle ? `<br><span style="font-size:12px;color:#666">${m.subtitle}</span>` : ''}
          </div>
        `)
      }
    })

    if (markers.length > 1) {
      const bounds = L.latLngBounds(markers.map((m) => [m.lat, m.lng]))
      map.fitBounds(bounds, { padding: [40, 40] })
    }

    mapInstanceRef.current = map

    return () => {
      map.remove()
      mapInstanceRef.current = null
    }
  }, [])

  return <div ref={mapRef} className={`rounded-lg ${className}`} style={{ height, width: '100%', zIndex: 0 }} />
}
