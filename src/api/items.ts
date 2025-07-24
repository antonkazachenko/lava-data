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
    // eslint-disable-next-line no-console
    console.error('Failed to fetch random items:', error);
    return [];
  }
};

export const fetchSingleRandomItem = async (): Promise<Item | null> => {
  try {
    // The /random/ endpoint returns an array, so we'll just take the first one.
    const response = await fetch(`${API_BASE_URL}/random/`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data: Item[] = await response.json();
    return data.length > 0 ? data[0] : null;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to fetch single random item:', error);
    return null;
  }
};
