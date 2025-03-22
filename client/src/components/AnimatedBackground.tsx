
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function AnimatedBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0a);
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    const shapes = [];
    const geometryTypes = [
      new THREE.IcosahedronGeometry(0.7),
      new THREE.OctahedronGeometry(0.7),
      new THREE.TetrahedronGeometry(0.7)
    ];

    for (let i = 0; i < 30; i++) {
      const geometry = geometryTypes[Math.floor(Math.random() * geometryTypes.length)];
      const material = new THREE.MeshPhongMaterial({
        color: 0x2563eb,
        wireframe: true,
        transparent: true,
        opacity: 0.3,
        emissive: 0x1e40af,
        emissiveIntensity: 0.2
      });
      
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.x = Math.random() * 30 - 15;
      mesh.position.y = Math.random() * 30 - 15;
      mesh.position.z = Math.random() * 30 - 15;
      
      shapes.push({
        mesh,
        rotationSpeed: Math.random() * 0.01,
        floatSpeed: Math.random() * 0.002 + 0.001
      });
      scene.add(mesh);
    }

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0, 0, 1);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0x404040));

    camera.position.z = 10;

    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      requestAnimationFrame(animate);

      camera.position.x += (mouseX * 2 - camera.position.x) * 0.02;
      camera.position.y += (mouseY * 2 - camera.position.y) * 0.02;
      camera.lookAt(scene.position);

      shapes.forEach((shape) => {
        shape.mesh.rotation.x += shape.rotationSpeed;
        shape.mesh.rotation.y += shape.rotationSpeed;
        shape.mesh.position.y += Math.sin(Date.now() * shape.floatSpeed) * 0.01;
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
        pointerEvents: 'none'
      }}
    />
  );
}
