export interface Item {
  id: number;
  website_url: string;
  cleaned_website_text: string;
  Predicted_Label: string;
}

const API_BASE_URL = 'https://lava-backend.onrender.com/api';

export const fetchRandomItems = async (): Promise<Item[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/random/`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data: Item[] = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch random items:', error);
    return [];
  }
};
