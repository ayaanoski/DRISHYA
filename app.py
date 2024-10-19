from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS  # Import CORS
import os
import cv2
import face_recognition
import numpy as np

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Create necessary directories for uploads and detected faces
if not os.path.exists("uploads"):
    os.makedirs("uploads")
if not os.path.exists("detected_faces"):
    os.makedirs("detected_faces")

# Dynamically find the paths for the DNN model
current_dir = os.path.dirname(os.path.abspath(__file__))  # Get the current directory
prototxt_path = os.path.join(
    current_dir, "modules", "deploy.prototxt"
)  # Path to prototxt file
model_path = os.path.join(
    current_dir, "modules", "res10_300x300_ssd_iter_140000.caffemodel"
)  # Path to model weights
net = cv2.dnn.readNetFromCaffe(prototxt_path, model_path)


@app.route("/upload", methods=["POST"])
def upload():
    print(request.files)  # Log the received files
    if "video" not in request.files or "face" not in request.files:
        print("Missing video or face image")
        return jsonify({"error": "No video or face image uploaded"}), 400

    video_file = request.files["video"]
    face_image_file = request.files["face"]

    # Save uploaded files to the server
    video_path = os.path.join("uploads", video_file.filename)
    face_image_path = os.path.join("uploads", face_image_file.filename)

    video_file.save(video_path)
    face_image_file.save(face_image_path)

    # Face detection logic
    known_face_encodings = []
    known_face_names = []

    # Load the face image and encode it
    img = face_recognition.load_image_file(face_image_path)
    encoding = face_recognition.face_encodings(img)
    if encoding:
        known_face_encodings.append(encoding[0])  # Get face encoding
        name = os.path.splitext(os.path.basename(face_image_path))[0]
        known_face_names.append(name)
        print(f"Loaded {name} for recognition.")
    else:
        return jsonify({"error": "No face found in the uploaded face image"}), 400

    detected_faces = set()
    detected_face_images = []  # To store paths of detected face images

    # Initialize video capture
    cap = cv2.VideoCapture(video_path)

    while True:
        success, img = cap.read()
        if not success:
            break

        # Prepare image for DNN model
        blob = cv2.dnn.blobFromImage(img, 1.0, (300, 300), (104.0, 177.0, 123.0))
        net.setInput(blob)
        detections = net.forward()

        imgRGB = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

        # Process each detected face from DNN output
        for i in range(detections.shape[2]):
            confidence = detections[0, 0, i, 2]
            if confidence > 0.5:  # Confidence threshold
                box = detections[0, 0, i, 3:7] * np.array(
                    [img.shape[1], img.shape[0], img.shape[1], img.shape[0]]
                )
                (left, top, right, bottom) = box.astype("int")

                # Detect faces using face_recognition library
                face_locations = [(top, right, bottom, left)]
                face_encodings = face_recognition.face_encodings(imgRGB, face_locations)

                for face_encoding in face_encodings:
                    matches = face_recognition.compare_faces(
                        known_face_encodings, face_encoding
                    )
                    name = "Unknown"

                    if True in matches:
                        best_match_index = matches.index(True)
                        name = known_face_names[best_match_index]

                        if name not in detected_faces:
                            detected_faces.add(name)
                            print(f"Detected {name}!")

                            # Save the detected face image
                            face_frame = img[top:bottom, left:right]
                            face_file_path = f"detected_faces/{name}_detected.jpg"
                            cv2.imwrite(face_file_path, face_frame)
                            detected_face_images.append(
                                face_file_path
                            )  # Add the path to the list

    cap.release()

    return jsonify(
        {
            "detected_faces": list(detected_faces),
            "detected_face_images": detected_face_images,  # Return paths of detected face images
        }
    )


@app.route("/detected_faces/<path:filename>", methods=["GET"])
def send_detected_face(filename):
    """Serve detected face images."""
    return send_from_directory("detected_faces", filename)


if __name__ == "__main__":
    app.run(debug=True)
