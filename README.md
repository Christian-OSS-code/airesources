# AI Resources Management App

A simple full-stack application for managing and analyzing products and prices, built with a FastAPI backend and a React (Vite) frontend.

## How It Works (Step-by-Step)

The application follows a logical flow to help you navigate through your data:

1.  **Product List (Discovery)**:
    *   Navigate to the **Products** tab to see all items.
    *   Use the search bar and filters (Brand, Mass) to find specific products.
    *   Gain insights into product details stored in the database.

2.  **Price List (Analysis)**:
    *   Head over to the **Prices** tab for detailed pricing information.
    *   Search by DAN or filter by Seller and Calendar Week.
    *   Monitor how prices fluctuate or compare across different sellers.

---

## Project Structure

### Backend (`/backend`)
*   **Framework**: FastAPI
*   **Database**: MariaDB
*   **Key Files**:
    *   `main.py`: API endpoints and core logic.
    *   `database.py`: Database connection management.
    *   `schemas.py`: Data models and validation.

### Prerequisites
*   Python 3.10+
*   Node.js & npm
*   MariaDB server running

### Setup Instructions

1.  **Backend**:
    ```bash
    cd backend
    python -m venv venv
    ./venv/Scripts/activate  # On Windows
    pip install -r requirements.txt
    python main.py
    ```

2.  **Access**:
    Open `http://localhost:5173` in your browser.
