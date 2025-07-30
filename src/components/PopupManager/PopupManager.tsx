import { useEffect } from 'react'
import './PopupStyle.css'
import { PopupContent } from './PopupContent'
import { usePopupData } from '@/hooks/usePopupData'
import "@viivue/easy-popup"

// Dynamic Popup Content Component
const DynamicPopupContent: React.FC<{ popupId: string }> = ({ popupId }) => {
  const { data, loading, error } = usePopupData(popupId);

  return (
    <PopupContent
      title={data?.title || 'Loading...'}
      description={data?.description || ''}
      features={data?.features || []}
      status={data?.status}
      loading={loading}
      error={error}
    />
  );
};

// Popup IDs configuration
const popupIds = ['screen-popup', 'screen001-popup'];

// Popup Manager Component
export const PopupManager = () => {
    useEffect(() => {
    const initializePopups = () => {
      if (window.EasyPopup) {
        try {
          window.EasyPopup.init('[data-easy-popup]', {
            theme: 'right-side',
            closeButtonInnerText: '✕',
            clickOutsideToClose: true,
            keyboard: true,
            preventScroll: true
          })
          console.log('Popups initialized successfully')
        } catch (error) {
          console.log('Popups already initialized or error:', error)
        }
      } else {
        // Retry if EasyPopup isn't available yet
        setTimeout(initializePopups, 100)
      }
    }
    
    // Initialize popups after component mounts
    initializePopups()
  }, [])

  return (
    <>
      {/* Popup HTML content */}
      {popupIds.map((id) => (
        <div key={id} data-easy-popup={id}>
          <DynamicPopupContent popupId={id} />
        </div>
      ))}
      {/* Debug info */}
      <div style={{display: 'none'}}>
        Popup IDs: {popupIds.join(', ')}
      </div>
    </>
  )
}

// Hook for managing popups
export const usePopupManager = () => {
  const openPopup = (popupId: string) => {
    console.log('Attempting to open popup:', popupId)
    console.log('Window EasyPopup available:', typeof window !== 'undefined' && !!window.EasyPopup)
    
    if (typeof window !== 'undefined' && window.EasyPopup) {
      try {
        const popup = window.EasyPopup.get(popupId)
        console.log('Popup instance:', popup)
        if (popup) {
          popup.open()
          console.log('Popup opened successfully')
        } else {
          console.error('Popup not found for ID:', popupId)
        }
      } catch (error) {
        console.error('Error opening popup:', error)
      }
    } else {
      console.error('EasyPopup not available')
    }
  }

  const closePopup = (popupId: string) => {
    if (typeof window !== 'undefined' && window.EasyPopup) {
      try {
        const popup = window.EasyPopup.get(popupId)
        if (popup) {
          popup.close()
        }
      } catch (error) {
        console.error('Error closing popup:', error)
      }
    }
  }

  const togglePopup = (popupId: string) => {
    if (typeof window !== 'undefined' && window.EasyPopup) {
      try {
        const popup = window.EasyPopup.get(popupId)
        if (popup) {
          popup.toggle()
        }
      } catch (error) {
        console.error('Error toggling popup:', error)
      }
    }
  }

  return {
    openPopup,
    closePopup,
    togglePopup
  }
}

// Example usage component
export const PopupTestButtons = () => {
  const { openPopup } = usePopupManager()

  return (
    <div style={{
      position: 'fixed',
      top: '10px',
      left: '10px',
      zIndex: 1000,
      background: 'rgba(0,0,0,0.8)',
      padding: '10px',
      borderRadius: '5px'
    }}>
      <button 
        onClick={() => openPopup('screen-popup')}
        style={{
          marginRight: '10px',
          padding: '8px 12px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Test Screen Popup
      </button>
      <button 
        onClick={() => openPopup('screen001-popup')}
        style={{
          padding: '8px 12px',
          backgroundColor: '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Test Screen001 Popup
      </button>
    </div>
  )
} 