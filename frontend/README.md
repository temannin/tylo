# tylo - Full-Stack Trello Alternative

tylo is a full-stack Trello alternative designed to streamline project management, collaboration, and task tracking. With an intuitive interface and powerful features, tylo helps teams stay organized and boost productivity.

## Features

- **Boards and Lists:** Create boards to organize your projects and add lists to categorize tasks.
- **Cards:** Add cards to your lists to represent tasks or items. Customize them with due dates, labels, and descriptions.
- **Drag-and-Drop:** Easily rearrange cards and lists using an intuitive drag-and-drop interface.
- **Collaboration:** Invite team members to boards and collaborate in real-time.
- **Comments:** Leave comments on cards to facilitate communication and updates.
- **Notifications:** Stay informed with instant notifications for board activities.

## Technologies Used

- **Frontend:**

  - React
  - Zustand
  - TailwindCSS

- **Backend:**
  - Ruby on Rails
  - Postgres

## Getting Started

### Prerequisites

- **Required**
  - Node.js and yarn installed on your machine.
  - Postgres
- **Optional**
  - Python3 (optional, for Honcho)
    - Honcho

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/tylo.git
   cd tylo
   ```

2. Install dependencies:
   ```bash
   cd frontend
   yarn
   ```
   ```bash
   cd backend
   bundle install
   ```
3. Set up environment variables:

- Create a `.env` file in the **root of the _backend_** directory and add your configuration variables.
  ```bash
  DB_USERNAME=<name>
  DB_PASSWORD=<password>
  ```
- Run the application:
  ```bash
  ./dev.sh # requires Honcho installed
  ```

## Contributing

We welcome contributions from the community. If you find a bug or have a feature request, please open an issue. Pull requests are also encouraged.

## Acknowledgments

- Hat tip to the creators of Trello for the inspiration.
