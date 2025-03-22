
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function AnimatedBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    const shapes = [];
    const geometryTypes = [
      new THREE.OctahedronGeometry(0.5),
      new THREE.BoxGeometry(0.8, 0.8, 0.8),
      new THREE.TorusGeometry(0.4, 0.2, 16, 100)
    ];

    for (let i = 0; i < 15; i++) {
      const geometry = geometryTypes[Math.floor(Math.random() * geometryTypes.length)];
      const material = new THREE.MeshPhongMaterial({
        color: 0x0066ff,
        wireframe: true,
        transparent: true,
        opacity: 0.15,
        emissive: 0x001133,
        emissiveIntensity: 0.1
      });
      
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.x = Math.random() * 20 - 10;
      mesh.position.y = Math.random() * 20 - 10;
      mesh.position.z = Math.random() * 10 - 5;
      
      shapes.push({
        mesh,
        rotationSpeed: Math.random() * 0.005,
        floatSpeed: Math.random() * 0.001 + 0.0005
      });
      scene.add(mesh);
    }

    const light = new THREE.DirectionalLight(0xffffff, 0.5);
    light.position.set(0, 0, 1);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0x101010));

    camera.position.z = 8;

    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      requestAnimationFrame(animate);

      camera.position.x += (mouseX * 2 - camera.position.x) * 0.01;
      camera.position.y += (mouseY * 2 - camera.position.y) * 0.01;
      camera.lookAt(scene.position);

      shapes.forEach((shape) => {
        shape.mesh.rotation.x += shape.rotationSpeed;
        shape.mesh.rotation.y += shape.rotationSpeed * 1.2;
        shape.mesh.position.y += Math.sin(Date.now() * shape.floatSpeed) * 0.005;
      });

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
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
        pointerEvents: 'none',
        background: 'black'
      }}
    />
  );
}
