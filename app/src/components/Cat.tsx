import { useMemo, useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree, type ThreeEvent } from '@react-three/fiber'
import { ContactShadows } from '@react-three/drei'
import * as THREE from 'three'

/* ---------- palette ---------- */
const ORANGE = '#EE8B4D'
const STRIPE = '#D96C2C'
const CREAM = '#FBEEDC'
const PINK = '#E8788B'
const INK = '#26201B'

function useReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const fn = (e: MediaQueryListEvent) => setReduced(e.matches)
    mq.addEventListener('change', fn)
    return () => mq.removeEventListener('change', fn)
  }, [])
  return reduced
}

/* ---------- whisker ---------- */
function Whisker({ side, y, tilt }: { side: 1 | -1; y: number; tilt: number }) {
  return (
    <mesh
      position={[side * 0.62, y, 0.32]}
      rotation={[0, side * -0.5, side * (Math.PI / 2 + tilt)]}
    >
      <cylinderGeometry args={[0.007, 0.007, 0.52, 5]} />
      <meshStandardMaterial color="#FFF7EA" roughness={0.6} />
    </mesh>
  )
}

/* ---------- ear ---------- */
function Ear({ side, twitchRef }: { side: 1 | -1; twitchRef: React.RefObject<THREE.Group | null> }) {
  return (
    <group ref={side === 1 ? twitchRef : undefined} position={[side * 0.42, 0.62, -0.02]} rotation={[0.12, 0, side * -0.42]}>
      <mesh castShadow>
        <coneGeometry args={[0.27, 0.52, 24]} />
        <meshStandardMaterial color={ORANGE} roughness={0.75} />
      </mesh>
      <mesh position={[0, -0.05, 0.09]} scale={[0.62, 0.62, 0.5]}>
        <coneGeometry args={[0.27, 0.52, 24]} />
        <meshStandardMaterial color={PINK} roughness={0.8} />
      </mesh>
    </group>
  )
}

/* ---------- the cat ---------- */
function CatModel() {
  const reduced = useReducedMotion()
  const root = useRef<THREE.Group>(null)
  const head = useRef<THREE.Group>(null)
  const body = useRef<THREE.Mesh>(null)
  const tail = useRef<THREE.Group>(null)
  const eyeL = useRef<THREE.Group>(null)
  const eyeR = useRef<THREE.Group>(null)
  const pupilL = useRef<THREE.Mesh>(null)
  const pupilR = useRef<THREE.Mesh>(null)
  const earRef = useRef<THREE.Group>(null)
  const earRRef = useRef<THREE.Group>(null)

  /* behaviour state kept in refs to avoid re-renders */
  const blink = useRef({ next: 2.2, until: -1 })
  const twitch = useRef({ next: 4, until: -1, amount: 0 })
  const jump = useRef({ vy: 0, y: 0, active: false, spin: 0 })
  const [happy, setHappy] = useState(false)

  /* tail chain — alternating striped spheres along an upward curl */
  const tailSegs = useMemo(() => {
    const segs: { pos: [number, number, number]; r: number; color: string }[] = []
    const pts = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0.14, 0.18, -0.28),
      new THREE.Vector3(0.2, 0.5, -0.42),
      new THREE.Vector3(0.1, 0.85, -0.4),
      new THREE.Vector3(-0.08, 1.08, -0.28),
    ]).getPoints(8)
    pts.forEach((p, i) => {
      const r = 0.17 - i * 0.011
      segs.push({ pos: [p.x, p.y, p.z], r, color: i % 2 === 0 ? ORANGE : STRIPE })
    })
    return segs
  }, [])

  const onPet = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation()
    if (jump.current.active) return
    jump.current = { vy: 5.2, y: 0, active: true, spin: 0 }
    setHappy(true)
  }

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime
    const g = root.current
    if (!g) return
    const px = state.pointer.x
    const py = state.pointer.y

    /* --- jump physics --- */
    if (jump.current.active) {
      jump.current.vy -= 14 * delta
      jump.current.y = Math.max(0, jump.current.y + jump.current.vy * delta)
      jump.current.spin += delta * 9
      if (jump.current.y === 0 && jump.current.vy < 0) {
        jump.current.active = false
        jump.current.spin = 0
        setHappy(false)
      }
    }
    const floatY = reduced || jump.current.active ? 0 : Math.sin(t * 1.6) * 0.045
    g.position.y = jump.current.y + floatY
    if (jump.current.active) {
      g.rotation.y += delta * 9
    } else if (Math.abs(g.rotation.y) > 0.001) {
      /* ease back to facing forward after a jump-spin */
      const r = g.rotation.y % (Math.PI * 2)
      g.rotation.y = r > Math.PI ? r - Math.PI * 2 : r
      g.rotation.y *= 0.8
    }

    /* --- head follows the pointer --- */
    if (head.current) {
      const tx = THREE.MathUtils.clamp(py * -0.45, -0.35, 0.4)
      const ty = THREE.MathUtils.clamp(px * 0.8, -0.65, 0.65)
      head.current.rotation.x += (tx - head.current.rotation.x) * 0.08
      head.current.rotation.y += (ty - head.current.rotation.y) * 0.08
      head.current.rotation.z = reduced ? 0 : Math.sin(t * 0.9) * 0.045
    }

    /* --- pupils track pointer --- */
    const pxOff = THREE.MathUtils.clamp(px * 0.055, -0.055, 0.055)
    const pyOff = THREE.MathUtils.clamp(py * 0.045, -0.045, 0.045)
    for (const p of [pupilL.current, pupilR.current]) {
      if (!p) continue
      p.position.x += (pxOff - p.position.x) * 0.2
      p.position.y += (pyOff - p.position.y) * 0.2
    }

    /* --- blinking / happy squint --- */
    let eyeScale = 1
    if (happy) {
      eyeScale = 0.22
    } else {
      if (t > blink.current.next) {
        blink.current.until = t + 0.16
        blink.current.next = t + 2.4 + Math.random() * 3.2
      }
      if (t < blink.current.until) eyeScale = 0.08
    }
    for (const e of [eyeL.current, eyeR.current]) {
      if (e) e.scale.y += (eyeScale - e.scale.y) * 0.5
    }

    /* --- ear twitch --- */
    if (t > twitch.current.next) {
      twitch.current.until = t + 0.5
      twitch.current.amount = 0.35 + Math.random() * 0.3
      twitch.current.next = t + 3.5 + Math.random() * 5
    }
    if (earRef.current) {
      const active = t < twitch.current.until
      const target = active && !reduced ? Math.sin(t * 28) * twitch.current.amount : 0
      earRef.current.rotation.z += (-0.42 + target - earRef.current.rotation.z) * 0.35
    }

    /* --- breathing --- */
    if (body.current && !reduced) {
      const b = 1 + Math.sin(t * 2.2) * 0.015
      body.current.scale.set(1 * b, 0.94 * (2 - b), 1.12 * b)
    }

    /* --- tail wag --- */
    if (tail.current && !reduced) {
      tail.current.rotation.z = Math.sin(t * 1.9) * 0.22 + (happy ? Math.sin(t * 9) * 0.18 : 0)
      tail.current.rotation.x = Math.sin(t * 1.3) * 0.1
    }
  })

  return (
    <group ref={root} onPointerDown={onPet} position={[0, 0, 0]}>
      {/* body */}
      <mesh ref={body} castShadow position={[0, 0.86, 0]} scale={[1, 0.94, 1.12]}>
        <sphereGeometry args={[0.92, 48, 48]} />
        <meshStandardMaterial color={ORANGE} roughness={0.72} />
      </mesh>
      {/* belly patch */}
      <mesh position={[0, 0.72, 0.62]} scale={[0.62, 0.72, 0.5]}>
        <sphereGeometry args={[0.72, 32, 32]} />
        <meshStandardMaterial color={CREAM} roughness={0.8} />
      </mesh>

      {/* front paws */}
      <mesh castShadow position={[0.34, 0.24, 0.72]}>
        <sphereGeometry args={[0.24, 24, 24]} />
        <meshStandardMaterial color={ORANGE} roughness={0.75} />
      </mesh>
      <mesh castShadow position={[-0.34, 0.24, 0.72]}>
        <sphereGeometry args={[0.24, 24, 24]} />
        <meshStandardMaterial color={ORANGE} roughness={0.75} />
      </mesh>
      {/* hind paws */}
      <mesh castShadow position={[0.78, 0.26, 0.28]} scale={[1, 0.8, 1.2]}>
        <sphereGeometry args={[0.26, 24, 24]} />
        <meshStandardMaterial color={ORANGE} roughness={0.75} />
      </mesh>
      <mesh castShadow position={[-0.78, 0.26, 0.28]} scale={[1, 0.8, 1.2]}>
        <sphereGeometry args={[0.26, 24, 24]} />
        <meshStandardMaterial color={ORANGE} roughness={0.75} />
      </mesh>

      {/* tail */}
      <group ref={tail} position={[0.1, 0.55, -0.8]}>
        {tailSegs.map((s, i) => (
          <mesh key={i} castShadow position={s.pos}>
            <sphereGeometry args={[s.r, 20, 20]} />
            <meshStandardMaterial color={s.color} roughness={0.75} />
          </mesh>
        ))}
      </group>

      {/* head */}
      <group ref={head} position={[0, 1.86, 0.22]}>
        <mesh castShadow>
          <sphereGeometry args={[0.74, 48, 48]} />
          <meshStandardMaterial color={ORANGE} roughness={0.72} />
        </mesh>

        {/* forehead stripes */}
        {[-0.15, 0, 0.15].map((x, i) => (
          <mesh key={i} position={[x, 0.55, 0.32]} rotation={[0.72, 0, 0]}>
            <boxGeometry args={[0.05, 0.17, 0.04]} />
            <meshStandardMaterial color={STRIPE} roughness={0.75} />
          </mesh>
        ))}

        {/* muzzle */}
        <mesh position={[0, -0.28, 0.58]} scale={[1, 0.72, 0.72]}>
          <sphereGeometry args={[0.34, 32, 32]} />
          <meshStandardMaterial color={CREAM} roughness={0.8} />
        </mesh>
        {/* nose */}
        <mesh position={[0, -0.12, 0.78]} rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[0.075, 0.09, 3]} />
          <meshStandardMaterial color={PINK} roughness={0.55} />
        </mesh>

        {/* eyes */}
        {([-1, 1] as const).map((side) => (
          <group
            key={side}
            ref={side === -1 ? eyeL : eyeR}
            position={[side * 0.29, 0.1, 0.6]}
          >
            <mesh>
              <sphereGeometry args={[0.145, 24, 24]} />
              <meshStandardMaterial color="#FFFDF6" roughness={0.3} />
            </mesh>
            <mesh ref={side === -1 ? pupilL : pupilR} position={[0, 0, 0.1]}>
              <sphereGeometry args={[0.075, 20, 20]} />
              <meshStandardMaterial color={INK} roughness={0.25} />
            </mesh>
            <mesh position={[0.035, 0.045, 0.155]}>
              <sphereGeometry args={[0.024, 12, 12]} />
              <meshBasicMaterial color="#FFFFFF" />
            </mesh>
          </group>
        ))}

        {/* ears */}
        <Ear side={-1} twitchRef={earRef} />
        <Ear side={1} twitchRef={earRRef} />

        {/* whiskers */}
        <Whisker side={1} y={-0.18} tilt={0.14} />
        <Whisker side={1} y={-0.26} tilt={0} />
        <Whisker side={1} y={-0.34} tilt={-0.14} />
        <Whisker side={-1} y={-0.18} tilt={0.14} />
        <Whisker side={-1} y={-0.26} tilt={0} />
        <Whisker side={-1} y={-0.34} tilt={-0.14} />
      </group>
    </group>
  )
}

/* ---------- drifting dust motes ---------- */
function Motes() {
  const motes = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        pos: [
          (Math.random() - 0.5) * 7,
          Math.random() * 3.4 + 0.3,
          (Math.random() - 0.5) * 3 - 0.5,
        ] as [number, number, number],
        r: 0.02 + Math.random() * 0.035,
        speed: 0.4 + Math.random() * 0.8,
        phase: Math.random() * Math.PI * 2,
        key: i,
      })),
    []
  )
  const group = useRef<THREE.Group>(null)
  useFrame((state) => {
    const t = state.clock.elapsedTime
    group.current?.children.forEach((m, i) => {
      const mo = motes[i]
      m.position.y = mo.pos[1] + Math.sin(t * mo.speed + mo.phase) * 0.35
      m.position.x = mo.pos[0] + Math.cos(t * mo.speed * 0.6 + mo.phase) * 0.2
    })
  })
  return (
    <group ref={group}>
      {motes.map((m) => (
        <mesh key={m.key} position={m.pos}>
          <sphereGeometry args={[m.r, 8, 8]} />
          <meshBasicMaterial color="#E9C46A" transparent opacity={0.65} />
        </mesh>
      ))}
    </group>
  )
}

/* ---------- keeps the whole cat in frame at any canvas aspect ---------- */
function CatRig() {
  const { size } = useThree()
  const aspect = size.width / size.height
  const s = THREE.MathUtils.clamp(aspect / 1.2, 0.32, 1)
  return (
    <group scale={s}>
      <CatModel />
    </group>
  )
}

/* ---------- exported canvas ---------- */
export default function Cat() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 1.75, 6.2], fov: 36 }}
      style={{ touchAction: 'pan-y' }}
      gl={{ antialias: true, alpha: true }}
      onCreated={({ camera }) => camera.lookAt(0, 1.35, 0)}
    >
      <ambientLight intensity={0.85} />
      <hemisphereLight args={['#FFF4E0', '#E8DCC4', 0.55]} />
      <directionalLight
        position={[4, 6, 5]}
        intensity={1.35}
        color="#FFE9C9"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-5, 3, -2]} intensity={0.35} color="#A8DADC" />
      <CatRig />
      <Motes />
      <ContactShadows position={[0, -0.02, 0]} opacity={0.34} scale={9} blur={2.6} far={3} color="#8a5a2b" />
    </Canvas>
  )
}
