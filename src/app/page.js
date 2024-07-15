"use client";
import * as THREE from "three";
import { useEffect, useRef } from "react";

export default function Home() {
  const mountRef = useRef(null);

  useEffect(() => {
    let scene, camera, renderer, sun, earth, orbit;

    function init() {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(
        75, // Field of vision, how wide
        window.innerWidth / window.innerHeight, // Aspect ratio
        0.1, // Closest point to you
        1000 // How far to look
      );
      camera.position.z = 30;

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      mountRef.current.appendChild(renderer.domElement);

      // EARTH
      const earthGeometry = new THREE.SphereGeometry(1, 32, 32);
      const earthMaterial = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load("/earth.jpg"),
      });
      earth = new THREE.Mesh(earthGeometry, earthMaterial);

      // SUN
      const sunGeometry = new THREE.SphereGeometry(5, 32, 32);
      const sunMaterial = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load("/sun.jpg"),
      });
      sun = new THREE.Mesh(sunGeometry, sunMaterial);

      earth.position.z = 10;
      orbit = new THREE.Group();
      orbit.add(earth);
      scene.add(orbit);
      scene.add(sun);

      animate();
    }

    function animate() {
      requestAnimationFrame(animate);
      sun.rotation.y += 0.01;
      earth.rotation.y += 0.01;
      orbit.rotation.y += 0.01;
      renderer.render(scene, camera);
    }

    init();

    // Cleanup function to remove the renderer
    return () => {
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return <main ref={mountRef}></main>;
}
