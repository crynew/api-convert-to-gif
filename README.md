
# Video to GIF Conversion API

This repository contains an API that allows you to convert `.mp4` video files into GIFs using **FFmpeg**. The API uses **Express** for the backend, **Multer** for file uploads, and **Fluent-FFmpeg** for video conversion.

## Features

- **Video Upload**: The API accepts `.mp4` video files uploaded via a POST request.
- **Conversion to GIF**: Once uploaded, the video is processed and converted into a GIF file.
- **GIF Return**: After conversion, the generated GIF is sent back to the client as a response.
- **Temporary File Deletion**: After the GIF is sent, both the original video file and the generated GIF are deleted to free up space.

## How It Works

1. **Upload the Video**: The user sends a `.mp4` video file via a `POST` request to the `/convert-to-gif` route.
2. **Processing and Conversion**: The video is processed and converted into a GIF using FFmpeg. The conversion starts from the 5th second of the video and lasts for 5 seconds.
3. **GIF Return**: The generated GIF is returned to the client, and the temporary files are removed.

## Requirements

- Node.js >= 14
- FFmpeg (Globally or locally installed)
- Dependencies:
  - express
  - multer
  - fluent-ffmpeg
  - form-data
  - node-fetch

## Installation

### 1. Clone the Repository

Clone this repository to your local machine:

```bash
git clone https://github.com/crynew/api-convert-to-gif.git
```

### 2. Install Dependencies

Install the required dependencies:

```bash
cd api-convert-to-gif
npm install
```

### 3. Install FFmpeg

Make sure **FFmpeg** is installed on your system. If you don't have FFmpeg installed, you can download it [here](https://ffmpeg.org/download.html).

To install FFmpeg globally, you can use the following commands:

- **Windows (via Chocolatey)**:
  ```bash
  choco install ffmpeg
  ```

- **Linux (Debian/Ubuntu)**:
  ```bash
  sudo apt install ffmpeg
  ```

- **macOS (via Homebrew)**:
  ```bash
  brew install ffmpeg
  ```

### 4. Run the Server

Now you can start the application with the following command:

```bash
npx ts-node src/app.ts
```

The server will start on port 3000.

## Usage

### 1. Upload a Video

Send a video file to the API using the `/convert-to-gif` endpoint. Below is an example of how to upload a video using **FormData** (JavaScript or TypeScript):

```typescript
import FormData from 'form-data';
import fs from 'fs';
import fetch from 'node-fetch';

// Path to the video file
const videoPath = '';

// Create the FormData and append the video file
const form = new FormData();
form.append('video', fs.createReadStream(videoPath));

// Send the video to the server
fetch('http://localhost:3000/convert-to-gif', {
  method: 'POST',
  body: form,
  headers: form.getHeaders(),
})
  .then((response) => response.json())
  .then((data) => {
    console.log('GIF converted successfully:', data);
  })
  .catch((error) => {
    console.error('Error converting video:', error);
  });
```

### 2. Response

The API will return the converted GIF. If an error occurs during the conversion, you will receive an error response.

Example of a successful response:

```json
{
  "message": "GIF successfully converted.",
  "gifUrl": "http://localhost:3000/uploads/filename.gif"
}
```

### 3. Temporary File Deletion

After sending the GIF, the original video file and the generated GIF will be deleted from the server.

## Project Structure

```
/src
  ├── /uploads       # Directory where video files and temporary GIFs are stored
  ├── app.ts         # Main file containing the server logic
/package.json         # npm configuration file
/tsconfig.json        # TypeScript configuration
```

## Contributions

If you encounter any bugs or have suggestions, feel free to open an issue or submit a pull request. Contributions are welcome!

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
