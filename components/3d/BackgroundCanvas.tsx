"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function BackgroundCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // Multi-layered particle system
    const createParticleLayer = (count: number, size: number, color1: THREE.Color, color2: THREE.Color, spread: number) => {
      const positions = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);
      const sizes = new Float32Array(count);

      for (let i = 0; i < count; i++) {
        positions[i * 3] = (Math.random() - 0.5) * spread;
        positions[i * 3 + 1] = (Math.random() - 0.5) * spread;
        positions[i * 3 + 2] = (Math.random() - 0.5) * spread;

        const mixFactor = Math.random();
        const color = new THREE.Color().lerpColors(color1, color2, mixFactor);
        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;
        sizes[i] = Math.random() * size + size * 0.5;
      }

      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
      geo.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

      return new THREE.Points(geo, new THREE.PointsMaterial({
        size: size,
        vertexColors: true,
        transparent: true,
        opacity: 0.6,
        sizeAttenuation: true,
        blending: THREE.AdditiveBlending,
      }));
    };

    // Layer 1: Deep background stars (indigo/cyan)
    const layer1 = createParticleLayer(3000, 0.08, new THREE.Color(0.39, 0.32, 0.94), new THREE.Color(0.02, 0.71, 0.83), 80);
    scene.add(layer1);

    // Layer 2: Mid-ground particles (violet/pink)
    const layer2 = createParticleLayer(1500, 0.12, new THREE.Color(0.55, 0.36, 0.96), new THREE.Color(0.93, 0.29, 0.60), 50);
    scene.add(layer2);

    // Layer 3: Foreground sparkles (cyan/white)
    const layer3 = createParticleLayer(500, 0.2, new THREE.Color(0.06, 0.72, 0.83), new THREE.Color(1, 1, 1), 30);
    scene.add(layer3);

    // Floating geometric shapes with glow
    const shapes: THREE.Mesh[] = [];
    const geometries = [
      new THREE.OctahedronGeometry(0.4, 0),
      new THREE.TetrahedronGeometry(0.3, 0),
      new THREE.IcosahedronGeometry(0.25, 0),
      new THREE.TorusGeometry(0.3, 0.08, 16, 32),
      new THREE.DodecahedronGeometry(0.2, 0),
    ];

    for (let i = 0; i < 25; i++) {
      const geoIndex = Math.floor(Math.random() * geometries.length);
      const hue = Math.random() > 0.5 ? 0.65 : 0.52; // Indigo or cyan
      const color = new THREE.Color().setHSL(hue, 0.8, 0.6);

      const mesh = new THREE.Mesh(
        geometries[geoIndex],
        new THREE.MeshBasicMaterial({ 
          color, 
          wireframe: true, 
          transparent: true, 
          opacity: 0.15 + Math.random() * 0.1 
        })
      );
      mesh.position.set(
        (Math.random() - 0.5) * 25, 
        (Math.random() - 0.5) * 25, 
        (Math.random() - 0.5) * 15
      );
      mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
      mesh.userData = {
        rotSpeed: { x: (Math.random() - 0.5) * 0.01, y: (Math.random() - 0.5) * 0.01 },
        floatSpeed: Math.random() * 0.5 + 0.5,
        floatOffset: Math.random() * Math.PI * 2,
      };
      scene.add(mesh);
      shapes.push(mesh);
    }

    // Light beams / aurora effect
    const auroraGroup = new THREE.Group();
    for (let i = 0; i < 12; i++) {
      const curve = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3((Math.random() - 0.5) * 20, -10, (Math.random() - 0.5) * 5),
        new THREE.Vector3((Math.random() - 0.5) * 10, 0, (Math.random() - 0.5) * 3),
        new THREE.Vector3((Math.random() - 0.5) * 20, 10, (Math.random() - 0.5) * 5)
      );
      const tubeGeo = new THREE.TubeGeometry(curve, 20, 0.02, 4, false);
      const hue = 0.55 + Math.random() * 0.15;
      const tube = new THREE.Mesh(
        tubeGeo,
        new THREE.MeshBasicMaterial({ 
          color: new THREE.Color().setHSL(hue, 0.9, 0.5),
          transparent: true, 
          opacity: 0.06 
        })
      );
      auroraGroup.add(tube);
    }
    scene.add(auroraGroup);

    // Grid floor
    const gridHelper = new THREE.GridHelper(40, 40, 0x6366f1, 0x1e1b4b);
    gridHelper.position.y = -8;
    gridHelper.material.opacity = 0.08;
    gridHelper.material.transparent = true;
    scene.add(gridHelper);

    camera.position.z = 8;
    camera.position.y = 2;

    let mouseX = 0, mouseY = 0;
    let targetMouseX = 0, targetMouseY = 0;

    const onMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 0.8;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 0.5;
    };
    window.addEventListener("mousemove", onMouseMove);

    const clock = new THREE.Clock();
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Smooth mouse follow
      mouseX += (targetMouseX - mouseX) * 0.03;
      mouseY += (targetMouseY - mouseY) * 0.03;

      // Rotate particle layers
      layer1.rotation.y = t * 0.015;
      layer1.rotation.x = Math.sin(t * 0.01) * 0.1;
      layer2.rotation.y = t * 0.02 + 1;
      layer2.rotation.x = Math.cos(t * 0.015) * 0.15;
      layer3.rotation.y = t * 0.025 + 2;

      // Animate shapes
      shapes.forEach((s, i) => {
        s.rotation.x += s.userData.rotSpeed.x;
        s.rotation.y += s.userData.rotSpeed.y;
        s.position.y += Math.sin(t * s.userData.floatSpeed + s.userData.floatOffset) * 0.002;
      });

      // Aurora wave
      auroraGroup.rotation.z = t * 0.02;
      auroraGroup.children.forEach((child, i) => {
        (child as THREE.Mesh).material.opacity = 0.04 + Math.sin(t * 0.5 + i) * 0.02;
      });

      // Camera parallax
      camera.position.x += (mouseX - camera.position.x) * 0.02;
      camera.position.y += (2 + mouseY - camera.position.y) * 0.02;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (mountRef.current?.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{ 
        background: "radial-gradient(ellipse at 50% 0%, #0f172a 0%, #02040a 50%, #000000 100%)" 
      }}
    />
  );
}
