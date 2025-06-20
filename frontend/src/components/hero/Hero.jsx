import Spline from '@splinetool/react-spline';
import { useRef, useEffect } from 'react';

export default function Hero() {
  const splineRef = useRef(null);

  function onLoad(splineApp) {
    splineRef.current = splineApp;

    // Check if the camera is defined
    if (splineApp && splineApp.scene && splineApp.scene.activeCamera) {
      const camera = splineApp.scene.activeCamera;

      // Set the background color to white
      splineApp.scene.backgroundColor = '#FFFFFF'; // White background
    }
  }

  useEffect(() => {
    const handleZoom = (e) => {
      const splineApp = splineRef.current;
      if (!splineApp || !splineApp.scene || !splineApp.scene.activeCamera) return;

      const camera = splineApp.scene.activeCamera;
      const zoomFactor = 0.1; // Adjust zoom speed factor

      if (e.deltaY < 0) {
        // Zoom in
        camera.zoom += zoomFactor;
      } else {
        // Zoom out
        camera.zoom -= zoomFactor;
      }

      // Restrict zoom levels to a particular range
      const maxZoomIn = 2; // Example: Max zoom in factor
      const maxZoomOut = 0.5; // Example: Max zoom out factor

      if (camera.zoom > maxZoomIn) camera.zoom = maxZoomIn; // Prevent zooming in beyond this level
      if (camera.zoom < maxZoomOut) camera.zoom = maxZoomOut; // Prevent zooming out beyond this level

      camera.updateProjectionMatrix(); // Ensure the camera updates after zooming
    };

    // Add event listener to control zoom
    window.addEventListener('wheel', handleZoom);

    // Clean up event listener
    return () => {
      window.removeEventListener('wheel', handleZoom);
    };
  }, []);

  return (
    <Spline
      scene="https://prod.spline.design/v-xi30VQD6CI8eCT/scene.splinecode"
      onLoad={onLoad}
    />
  );
}
