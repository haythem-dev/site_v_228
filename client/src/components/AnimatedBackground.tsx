
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function AnimatedBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true 
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x0f172a, 1);
    containerRef.current.appendChild(renderer.domElement);

    const shapes = [];
    const geometryTypes = [
      new THREE.IcosahedronGeometry(0.8),
      new THREE.OctahedronGeometry(0.8),
      new THREE.TorusGeometry(0.6, 0.2, 16, 100)
    ];

    for (let i = 0; i < 15; i++) {
      const geometry = geometryTypes[Math.floor(Math.random() * geometryTypes.length)];
      const material = new THREE.LineBasicMaterial({
        color: 0x2a4365,
        transparent: true,
        opacity: 0.3,
      });
      
      const wireframe = new THREE.LineSegments(
        new THREE.WireframeGeometry(geometry),
        material
      );
      
      wireframe.position.x = Math.random() * 40 - 20;
      wireframe.position.y = Math.random() * 40 - 20;
      wireframe.position.z = Math.random() * 40 - 20;
      
      wireframe.rotation.x = Math.random() * Math.PI;
      wireframe.rotation.y = Math.random() * Math.PI;
      
      shapes.push(wireframe);
      scene.add(wireframe);
    }

    camera.position.z = 15;

    const animate = () => {
      requestAnimationFrame(animate);

      shapes.forEach((shape) => {
        shape.rotation.x += 0.001;
        shape.rotation.y += 0.001;
      });

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        background: 'linear-gradient(to bottom right, #0f172a, #1e293b)',
        pointerEvents: 'none',
        opacity: 0.9
      }}
    />
  );
}
