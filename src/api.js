// API configuration
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:7071/api';

/**
 * Fetches chat completion from the Azure Function
 * @param {Array} messages - Array of message objects with role and content
 * @returns {Promise<Object>} - Assistant's response
 */
export async function fetchChatCompletion(messages) {
  try {
    const response = await fetch(`${API_BASE_URL}/GetAiResult`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(messages),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return JSON.parse(data);
  } catch (error) {
    console.error('Error fetching chat completion:', error);
    return {
      role: 'assistant',
      content: 'Sorry, I encountered an error processing your request. Please try again later.'
    };
  }
}

/**
 * Fetches search results from the backend
 * @param {string} query - Search query
 * @returns {Promise<Array>} - Search results
 */
export async function fetchSearchResults(query) {
  try {
    const response = await fetch(`${API_BASE_URL}/GetServerData?airid=${encodeURIComponent(query)}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching search results:', error);
    return [];
  }
}
