export interface PopupData {
  id: string;
  title: string;
  description: string;
  features: string[];
  status: {
    label: string;
    value: string;
    type: 'success' | 'warning' | 'error' | 'info';
  };
}

// Mock API data - replace with real API calls
const mockPopupData: Record<string, PopupData> = {
  'screen-popup': {
    id: 'screen-popup',
    title: 'Main Screen Information',
    description: 'You clicked on the main screen! This is an interactive display.',
    features: [
      '4K Ultra HD Resolution',
      'Touch-enabled Interface',
      'Real-time Data Display',
      'Multi-application Support'
    ],
    status: {
      label: 'Status',
      value: 'Active and Ready',
      type: 'success'
    }
  },
  'screen001-popup': {
    id: 'screen001-popup',
    title: 'Secondary Screen',
    description: 'This is the secondary display with extended functionality!',
    features: [
      'Extended Desktop Mode',
      'Mirror Display Available',
      'Video Conferencing Ready',
      'Presentation Mode'
    ],
    status: {
      label: 'Current Mode',
      value: 'Extended Display',
      type: 'info'
    }
  }
};

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export class PopupService {
  static async getPopupData(popupId: string): Promise<PopupData> {
    // Simulate API call
    await delay(500);
    
    const data = mockPopupData[popupId];
    if (!data) {
      throw new Error(`Popup data not found for ID: ${popupId}`);
    }
    
    return data;
  }

  static async getAllPopupData(): Promise<PopupData[]> {
    // Simulate API call
    await delay(300);
    
    return Object.values(mockPopupData);
  }

  // Real API implementation example:
  // static async getPopupData(popupId: string): Promise<PopupData> {
  //   const response = await fetch(`/api/popups/${popupId}`);
  //   if (!response.ok) {
  //     throw new Error('Failed to fetch popup data');
  //   }
  //   return response.json();
  // }
} 