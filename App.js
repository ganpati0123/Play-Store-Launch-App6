import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  Linking,
  Alert,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, {
  Defs,
  LinearGradient as SvgLG,
  Stop,
  Path,
  Circle,
  G,
} from 'react-native-svg';

const { width: SCREEN_W } = Dimensions.get('window');

const COLORS = {
  bg0: '#02000a',
  bg1: '#0a0420',
  bg2: '#1a0a3e',
  card: 'rgba(255,255,255,0.04)',
  cardBorder: 'rgba(255,255,255,0.08)',
  text: '#ffffff',
  sub: 'rgba(255,255,255,0.65)',
  dim: 'rgba(255,255,255,0.4)',
  pink: '#ff61d2',
  cyan: '#5efce8',
  yellow: '#ffd86f',
  purple: '#736efe',
  red: '#fd6585',
};

const HOLO = ['#ff61d2', '#fd6585', '#ffd86f', '#5efce8', '#736efe'];

const PROJECTS = [
  {
    title: 'Quantum Trader',
    tag: 'FinTech • iOS / Android',
    desc: 'AI-driven options analytics platform with real-time options chain & ML signal scoring.',
    colors: ['#ff61d2', '#736efe'],
    metrics: '⭐ 4.9 · 250k+ users',
  },
  {
    title: 'Aurora Notes',
    tag: 'Productivity • Cross-platform',
    desc: 'A markdown notebook with built-in AI co-writer, end-to-end encrypted sync.',
    colors: ['#5efce8', '#736efe'],
    metrics: '⭐ 4.8 · 80k+ users',
  },
  {
    title: 'Pulse Health',
    tag: 'Healthcare • RN + Wear OS',
    desc: 'Medication tracking, pharmacy delivery, vitals dashboard for doctors & patients.',
    colors: ['#fd6585', '#ffd86f'],
    metrics: '⭐ 4.7 · 120k+ users',
  },
  {
    title: 'Nebula Studio',
    tag: '3D Design • iPad',
    desc: 'A WebGPU-powered 3D scene builder with realtime ray-tracing previews.',
    colors: ['#736efe', '#ff61d2'],
    metrics: '🏆 Apple Design Award 2025',
  },
  {
    title: 'Drift Music',
    tag: 'Audio • Android',
    desc: 'Lossless streaming + spatial audio with personalized neural recommendations.',
    colors: ['#ffd86f', '#fd6585'],
    metrics: '⭐ 4.9 · 1M+ downloads',
  },
];

const SKILLS = [
  { name: 'React Native', level: 0.97 },
  { name: 'TypeScript', level: 0.94 },
  { name: 'iOS / Swift UI', level: 0.86 },
  { name: 'Android / Kotlin', level: 0.84 },
  { name: 'Node.js / GraphQL', level: 0.9 },
  { name: 'UI / UX Design', level: 0.92 },
  { name: 'AI / ML Integration', level: 0.78 },
];

const STATS = [
  { v: '12+', label: 'Years' },
  { v: '40+', label: 'Apps Shipped' },
  { v: '5M+', label: 'Users' },
  { v: '17', label: 'Awards' },
];

/* -------- Holographic G Mark (in-app SVG) -------- */
function GMark({ size = 120 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 1024 1024">
      <Defs>
        <SvgLG id="holo" x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="0%" stopColor="#ff61d2" />
          <Stop offset="50%" stopColor="#ffd86f" />
          <Stop offset="100%" stopColor="#5efce8" />
        </SvgLG>
        <SvgLG id="holo2" x1="100%" y1="0%" x2="0%" y2="100%">
          <Stop offset="0%" stopColor="#5efce8" />
          <Stop offset="100%" stopColor="#ff61d2" />
        </SvgLG>
      </Defs>
      <Path
        d="M 512 220 a 282 282 0 1 0 199 481 L 711 540 L 540 540 L 540 612 L 632 612 a 200 200 0 1 1 -42 -226 L 640 310 a 282 282 0 0 0 -128 -90 z"
        fill="url(#holo)"
        stroke="#ffffff"
        strokeWidth={3}
      />
      <Path
        d="M 640 310 L 711 310 L 711 381 Z"
        fill="url(#holo2)"
        stroke="#fff"
        strokeWidth={2}
      />
      <Path d="M 640 310 L 711 381" stroke="#fff" strokeWidth={3} />
    </Svg>
  );
}

/* -------- Reusable: Glow card -------- */
function Card({ children, style }) {
  return (
    <View style={[styles.card, style]}>
      <LinearGradient
        colors={['rgba(255,97,210,0.08)', 'rgba(94,252,232,0.04)', 'rgba(115,110,254,0.08)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      {children}
    </View>
  );
}

/* -------- Gradient Button -------- */
function GButton({ title, onPress, colors = HOLO, style }) {
  const scale = useRef(new Animated.Value(1)).current;
  return (
    <Pressable
      onPressIn={() =>
        Animated.spring(scale, { toValue: 0.96, useNativeDriver: true }).start()
      }
      onPressOut={() =>
        Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start()
      }
      onPress={onPress}
      style={style}
    >
      <Animated.View style={{ transform: [{ scale }] }}>
        <LinearGradient
          colors={colors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.btn}
        >
          <Text style={styles.btnText}>{title}</Text>
        </LinearGradient>
      </Animated.View>
    </Pressable>
  );
}

/* -------- Section heading -------- */
function SectionTitle({ kicker, title }) {
  return (
    <View style={{ marginBottom: 16 }}>
      <Text style={styles.kicker}>{kicker}</Text>
      <Text style={styles.h1}>{title}</Text>
    </View>
  );
}

/* ============ SCREENS ============ */

function HomeScreen({ go }) {
  const float = useRef(new Animated.Value(0)).current;
  const rot = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(float, { toValue: 1, duration: 2400, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(float, { toValue: 0, duration: 2400, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      ])
    ).start();
    Animated.loop(
      Animated.timing(rot, { toValue: 1, duration: 18000, easing: Easing.linear, useNativeDriver: true })
    ).start();
  }, []);
  const ty = float.interpolate({ inputRange: [0, 1], outputRange: [-8, 8] });
  const rotation = rot.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });

  return (
    <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
      <View style={styles.heroWrap}>
        <Animated.View style={[styles.heroRing, { transform: [{ rotate: rotation }] }]} />
        <Animated.View style={{ transform: [{ translateY: ty }] }}>
          <GMark size={170} />
        </Animated.View>
      </View>

      <Text style={styles.appName}>GoFolio</Text>
      <Text style={styles.tagline}>Pro · Max · Level</Text>
      <Text style={styles.heroSub}>
        Your premium portfolio universe. Showcase work, ship apps, win awards. ✨
      </Text>

      <View style={styles.heroBtns}>
        <GButton title="Explore Projects" onPress={() => go('projects')} />
        <Pressable onPress={() => go('contact')} style={styles.ghostBtn}>
          <Text style={styles.ghostBtnText}>Hire Me →</Text>
        </Pressable>
      </View>

      <View style={styles.statsRow}>
        {STATS.map((s) => (
          <View key={s.label} style={styles.statBox}>
            <Text style={styles.statV}>{s.v}</Text>
            <Text style={styles.statL}>{s.label}</Text>
          </View>
        ))}
      </View>

      <SectionTitle kicker="FEATURED" title="Latest Drop" />
      <Card style={{ padding: 18, marginBottom: 24 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
          <View style={[styles.pill, { backgroundColor: 'rgba(94,252,232,0.18)' }]}>
            <Text style={[styles.pillText, { color: COLORS.cyan }]}>NEW</Text>
          </View>
          <Text style={styles.smallDim}>  · April 2026</Text>
        </View>
        <Text style={styles.cardTitle}>Quantum Trader v3</Text>
        <Text style={styles.cardDesc}>
          ML-powered options scoring with sub-second signals. Now with watch widgets and Live Activities.
        </Text>
        <GButton
          title="See Case Study"
          onPress={() => go('projects')}
          style={{ marginTop: 12, alignSelf: 'flex-start' }}
        />
      </Card>

      <SectionTitle kicker="WHY GOFOLIO" title="Built different." />
      <View style={styles.featGrid}>
        {[
          { icon: '⚡', t: 'Lightning UI', d: 'Buttery 120fps interactions.' },
          { icon: '🎨', t: 'Crafted Design', d: 'Pixel-perfect, every screen.' },
          { icon: '🛡️', t: 'Secure', d: 'E2E encrypted by default.' },
          { icon: '🚀', t: 'Ship-ready', d: 'Tested at scale globally.' },
        ].map((f) => (
          <View key={f.t} style={styles.featCell}>
            <Text style={styles.featIcon}>{f.icon}</Text>
            <Text style={styles.featTitle}>{f.t}</Text>
            <Text style={styles.featDesc}>{f.d}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

function ProjectsScreen() {
  return (
    <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
      <SectionTitle kicker="PORTFOLIO" title="Projects" />
      <Text style={[styles.heroSub, { textAlign: 'left', marginBottom: 18 }]}>
        Selected work shipped to millions. Tap any card for details.
      </Text>
      {PROJECTS.map((p, i) => (
        <Pressable
          key={p.title}
          onPress={() => Alert.alert(p.title, p.desc + '\n\n' + p.metrics)}
          style={{ marginBottom: 14 }}
        >
          <View style={styles.projectCard}>
            <LinearGradient
              colors={p.colors}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.projectThumb}
            >
              <Text style={styles.projectInitial}>{p.title[0]}</Text>
            </LinearGradient>
            <View style={{ flex: 1, paddingLeft: 14 }}>
              <Text style={styles.cardTitle}>{p.title}</Text>
              <Text style={styles.cardTag}>{p.tag}</Text>
              <Text numberOfLines={2} style={styles.cardDesc}>{p.desc}</Text>
              <Text style={styles.cardMetric}>{p.metrics}</Text>
            </View>
          </View>
        </Pressable>
      ))}

      <View style={{ height: 24 }} />
      <Card style={{ padding: 18 }}>
        <Text style={styles.kicker}>OPEN FOR WORK</Text>
        <Text style={styles.cardTitle}>Have a wild idea?</Text>
        <Text style={styles.cardDesc}>
          I take on 2 client projects per quarter. Let's build something legendary.
        </Text>
      </Card>
    </ScrollView>
  );
}

function SkillBar({ name, level }) {
  const w = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(w, { toValue: level, duration: 1200, easing: Easing.out(Easing.cubic), useNativeDriver: false }).start();
  }, []);
  const pct = w.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] });
  return (
    <View style={{ marginBottom: 14 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={styles.skillName}>{name}</Text>
        <Text style={styles.skillPct}>{Math.round(level * 100)}%</Text>
      </View>
      <View style={styles.skillTrack}>
        <Animated.View style={[styles.skillFillWrap, { width: pct }]}>
          <LinearGradient
            colors={HOLO}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.skillFill}
          />
        </Animated.View>
      </View>
    </View>
  );
}

function SkillsScreen() {
  return (
    <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
      <SectionTitle kicker="EXPERTISE" title="Skills" />
      <Card style={{ padding: 18, marginBottom: 18 }}>
        {SKILLS.map((s) => (
          <SkillBar key={s.name} {...s} />
        ))}
      </Card>

      <SectionTitle kicker="TOOLS" title="Daily Stack" />
      <View style={styles.toolGrid}>
        {[
          'Figma', 'Xcode', 'Android Studio', 'VS Code',
          'Cursor', 'Linear', 'GitHub', 'Vercel',
          'Supabase', 'Firebase', 'AWS', 'Cloudflare',
        ].map((t) => (
          <View key={t} style={styles.toolPill}>
            <Text style={styles.toolText}>{t}</Text>
          </View>
        ))}
      </View>

      <View style={{ height: 24 }} />
      <SectionTitle kicker="PROCESS" title="How I work" />
      {[
        { n: '01', t: 'Discover', d: 'Goals, users, constraints.' },
        { n: '02', t: 'Design', d: 'Wireframes → high-fidelity prototype.' },
        { n: '03', t: 'Build', d: 'Native-feeling cross-platform code.' },
        { n: '04', t: 'Ship', d: 'CI/CD, store rollout, monitoring.' },
      ].map((p) => (
        <View key={p.n} style={styles.procRow}>
          <Text style={styles.procNum}>{p.n}</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.procTitle}>{p.t}</Text>
            <Text style={styles.procDesc}>{p.d}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

function AboutScreen() {
  return (
    <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
      <SectionTitle kicker="WHO" title="About" />
      <Card style={{ padding: 20, marginBottom: 18 }}>
        <View style={{ alignItems: 'center', marginBottom: 14 }}>
          <View style={styles.avatar}>
            <GMark size={70} />
          </View>
          <Text style={styles.name}>Ganpati</Text>
          <Text style={styles.role}>Senior Mobile Engineer · Founder</Text>
        </View>
        <Text style={styles.aboutText}>
          I design and ship premium mobile experiences. From fintech dashboards to
          health platforms — I obsess over speed, polish, and details that make
          people smile. GoFolio is my living portfolio: every section, animation
          and pixel here was hand-crafted.
        </Text>
      </Card>

      <SectionTitle kicker="JOURNEY" title="Timeline" />
      {[
        { y: '2026', t: 'Founded GoFolio Studio' },
        { y: '2024', t: 'Apple Design Award · Nebula Studio' },
        { y: '2022', t: 'Lead Mobile @ Pulse Health (acq. by Phizer)' },
        { y: '2019', t: 'Shipped Quantum Trader · 250k users in year 1' },
        { y: '2014', t: 'First app on Play Store · still maintained' },
      ].map((e) => (
        <View key={e.y} style={styles.tlRow}>
          <LinearGradient colors={HOLO} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.tlDot} />
          <Text style={styles.tlYear}>{e.y}</Text>
          <Text style={styles.tlText}>{e.t}</Text>
        </View>
      ))}

      <View style={{ height: 16 }} />
      <SectionTitle kicker="TESTIMONIAL" title="What clients say" />
      <Card style={{ padding: 18 }}>
        <Text style={styles.quote}>
          “Easily the most polished mobile work we've ever shipped. Felt like
          hiring an entire studio in one engineer.”
        </Text>
        <Text style={styles.quoteAuthor}>— CTO, Fortune 500 FinTech</Text>
      </Card>
    </ScrollView>
  );
}

function ContactScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const onSend = () => {
    if (!name || !email || !msg) {
      Alert.alert('Missing info', 'Please fill in all fields.');
      return;
    }
    Alert.alert('Sent ✓', `Thanks ${name}! I'll reply to ${email} within 24 hours.`);
    setName(''); setEmail(''); setMsg('');
  };

  return (
    <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
      <SectionTitle kicker="LET'S TALK" title="Contact" />
      <Text style={[styles.heroSub, { textAlign: 'left', marginBottom: 18 }]}>
        Got an idea, role or collab? Drop a message — I read everything.
      </Text>

      <Card style={{ padding: 18, marginBottom: 18 }}>
        <Text style={styles.inputLabel}>Name</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Your full name"
          placeholderTextColor={COLORS.dim}
          style={styles.input}
        />
        <Text style={styles.inputLabel}>Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="you@domain.com"
          placeholderTextColor={COLORS.dim}
          style={styles.input}
        />
        <Text style={styles.inputLabel}>Message</Text>
        <TextInput
          value={msg}
          onChangeText={setMsg}
          multiline
          numberOfLines={5}
          placeholder="Tell me about your project…"
          placeholderTextColor={COLORS.dim}
          style={[styles.input, { height: 120, textAlignVertical: 'top' }]}
        />
        <GButton title="Send Message" onPress={onSend} style={{ marginTop: 14 }} />
      </Card>

      <SectionTitle kicker="FIND ME" title="Channels" />
      {[
        { icon: '✉️', t: 'Email', v: 'hello@gofolio.app', a: () => Linking.openURL('mailto:hello@gofolio.app') },
        { icon: '🐦', t: 'X / Twitter', v: '@gofolio', a: () => Linking.openURL('https://twitter.com/') },
        { icon: '💼', t: 'LinkedIn', v: '/in/gofolio', a: () => Linking.openURL('https://linkedin.com/') },
        { icon: '🐙', t: 'GitHub', v: 'github.com/ganpati0123', a: () => Linking.openURL('https://github.com/ganpati0123') },
      ].map((c) => (
        <Pressable key={c.t} onPress={c.a} style={styles.contactRow}>
          <Text style={{ fontSize: 22, marginRight: 12 }}>{c.icon}</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>{c.t}</Text>
            <Text style={styles.cardTag}>{c.v}</Text>
          </View>
          <Text style={[styles.cardTag, { color: COLORS.cyan }]}>Open ↗</Text>
        </Pressable>
      ))}

      <View style={{ height: 28 }} />
      <Text style={styles.footer}>
        © {new Date().getFullYear()} GoFolio · Crafted with neon & care.
      </Text>
    </ScrollView>
  );
}

/* ============ ROOT ============ */

const TABS = [
  { id: 'home', label: 'Home', icon: '⌂' },
  { id: 'projects', label: 'Work', icon: '◧' },
  { id: 'skills', label: 'Skills', icon: '✦' },
  { id: 'about', label: 'About', icon: '◉' },
  { id: 'contact', label: 'Contact', icon: '✉' },
];

export default function App() {
  const [tab, setTab] = useState('home');

  const Screen = {
    home: <HomeScreen go={setTab} />,
    projects: <ProjectsScreen />,
    skills: <SkillsScreen />,
    about: <AboutScreen />,
    contact: <ContactScreen />,
  }[tab];

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      {/* Background gradient + glow blobs */}
      <LinearGradient
        colors={[COLORS.bg2, COLORS.bg1, COLORS.bg0]}
        style={StyleSheet.absoluteFill}
      />
      <View style={[styles.blob, { backgroundColor: COLORS.pink, top: -120, left: -80 }]} />
      <View style={[styles.blob, { backgroundColor: COLORS.cyan, top: 240, right: -100, opacity: 0.18 }]} />
      <View style={[styles.blob, { backgroundColor: COLORS.purple, bottom: 80, left: -120, opacity: 0.22 }]} />

      {/* Top bar */}
      <View style={styles.topBar}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <GMark size={32} />
          <Text style={styles.brand}>  GoFolio</Text>
        </View>
        <View style={[styles.pill, { backgroundColor: 'rgba(94,252,232,0.15)' }]}>
          <Text style={[styles.pillText, { color: COLORS.cyan }]}>PRO MAX</Text>
        </View>
      </View>

      <View style={{ flex: 1 }}>{Screen}</View>

      {/* Bottom tab bar */}
      <View style={styles.tabBarWrap}>
        <LinearGradient
          colors={['rgba(10,4,32,0.0)', 'rgba(10,4,32,0.95)']}
          style={styles.tabBarFade}
        />
        <View style={styles.tabBar}>
          {TABS.map((t) => {
            const active = tab === t.id;
            return (
              <Pressable key={t.id} onPress={() => setTab(t.id)} style={styles.tabItem}>
                {active ? (
                  <LinearGradient
                    colors={HOLO}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.tabActive}
                  >
                    <Text style={styles.tabIconActive}>{t.icon}</Text>
                    <Text style={styles.tabLabelActive}>{t.label}</Text>
                  </LinearGradient>
                ) : (
                  <View style={styles.tabInactive}>
                    <Text style={styles.tabIcon}>{t.icon}</Text>
                  </View>
                )}
              </Pressable>
            );
          })}
        </View>
      </View>
    </View>
  );
}

/* ============ STYLES ============ */

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.bg0 },
  blob: {
    position: 'absolute',
    width: 320,
    height: 320,
    borderRadius: 200,
    opacity: 0.25,
    transform: [{ scale: 1 }],
  },
  topBar: {
    paddingTop: Platform.OS === 'ios' ? 56 : 40,
    paddingBottom: 12,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brand: { color: COLORS.text, fontSize: 22, fontWeight: '900', letterSpacing: 0.5 },
  scroll: { paddingHorizontal: 20, paddingBottom: 140 },

  heroWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 220,
    marginTop: 8,
  },
  heroRing: {
    position: 'absolute',
    width: 230,
    height: 230,
    borderRadius: 200,
    borderWidth: 1.5,
    borderColor: 'rgba(255,97,210,0.35)',
    borderStyle: 'dashed',
  },
  appName: {
    fontSize: 56,
    color: COLORS.text,
    fontWeight: '900',
    textAlign: 'center',
    letterSpacing: 1,
    marginTop: 4,
  },
  tagline: {
    color: COLORS.cyan,
    textAlign: 'center',
    letterSpacing: 8,
    fontWeight: '700',
    marginBottom: 12,
  },
  heroSub: {
    color: COLORS.sub,
    textAlign: 'center',
    fontSize: 15,
    lineHeight: 22,
    paddingHorizontal: 12,
  },
  heroBtns: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    marginTop: 18,
    marginBottom: 26,
  },
  ghostBtn: {
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
  },
  ghostBtnText: { color: COLORS.text, fontWeight: '700', fontSize: 14 },

  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 28,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 14,
    marginHorizontal: 4,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    backgroundColor: COLORS.card,
  },
  statV: { color: COLORS.text, fontSize: 22, fontWeight: '900' },
  statL: { color: COLORS.dim, fontSize: 11, letterSpacing: 1, marginTop: 2 },

  kicker: {
    color: COLORS.cyan,
    fontWeight: '800',
    letterSpacing: 4,
    fontSize: 11,
    marginBottom: 6,
  },
  h1: { color: COLORS.text, fontSize: 28, fontWeight: '900', letterSpacing: -0.5 },

  card: {
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    backgroundColor: COLORS.card,
  },
  cardTitle: { color: COLORS.text, fontSize: 18, fontWeight: '800' },
  cardTag: { color: COLORS.cyan, fontSize: 12, fontWeight: '700', letterSpacing: 1, marginTop: 2, marginBottom: 4 },
  cardDesc: { color: COLORS.sub, fontSize: 13, lineHeight: 19 },
  cardMetric: { color: COLORS.yellow, fontSize: 12, fontWeight: '700', marginTop: 6 },
  smallDim: { color: COLORS.dim, fontSize: 12 },

  pill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    alignSelf: 'flex-start',
  },
  pillText: { fontSize: 10, fontWeight: '900', letterSpacing: 2 },

  btn: {
    paddingVertical: 14,
    paddingHorizontal: 22,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: { color: '#0a0420', fontSize: 14, fontWeight: '900', letterSpacing: 0.5 },

  featGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 16 },
  featCell: {
    width: (SCREEN_W - 40 - 12) / 2,
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    backgroundColor: COLORS.card,
  },
  featIcon: { fontSize: 26, marginBottom: 6 },
  featTitle: { color: COLORS.text, fontWeight: '800', fontSize: 15 },
  featDesc: { color: COLORS.sub, fontSize: 12, marginTop: 2 },

  projectCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 18,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  projectThumb: {
    width: 78,
    height: 78,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  projectInitial: { color: '#fff', fontWeight: '900', fontSize: 36 },

  skillName: { color: COLORS.text, fontWeight: '700', fontSize: 13 },
  skillPct: { color: COLORS.cyan, fontWeight: '800', fontSize: 12, letterSpacing: 1 },
  skillTrack: {
    height: 8,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.06)',
    overflow: 'hidden',
    marginTop: 6,
  },
  skillFillWrap: { height: '100%' },
  skillFill: { height: '100%', borderRadius: 999 },

  toolGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  toolPill: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    backgroundColor: COLORS.card,
  },
  toolText: { color: COLORS.sub, fontSize: 12, fontWeight: '700' },

  procRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.cardBorder,
  },
  procNum: { color: COLORS.pink, fontWeight: '900', fontSize: 22, width: 60, letterSpacing: 1 },
  procTitle: { color: COLORS.text, fontWeight: '800', fontSize: 16 },
  procDesc: { color: COLORS.sub, fontSize: 13, marginTop: 2 },

  avatar: {
    width: 110,
    height: 110,
    borderRadius: 110,
    backgroundColor: 'rgba(255,97,210,0.10)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  name: { color: COLORS.text, fontSize: 22, fontWeight: '900' },
  role: { color: COLORS.cyan, fontSize: 12, letterSpacing: 2, marginTop: 4, fontWeight: '700' },
  aboutText: { color: COLORS.sub, fontSize: 14, lineHeight: 22 },

  tlRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  tlDot: { width: 10, height: 10, borderRadius: 10, marginRight: 12 },
  tlYear: { color: COLORS.yellow, width: 52, fontWeight: '800' },
  tlText: { color: COLORS.text, fontSize: 14, flex: 1 },

  quote: { color: COLORS.text, fontSize: 15, lineHeight: 22, fontStyle: 'italic' },
  quoteAuthor: { color: COLORS.dim, fontSize: 12, marginTop: 8, letterSpacing: 1 },

  inputLabel: { color: COLORS.dim, fontSize: 11, letterSpacing: 2, marginTop: 8, fontWeight: '800' },
  input: {
    color: COLORS.text,
    fontSize: 15,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    backgroundColor: 'rgba(0,0,0,0.25)',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginTop: 6,
  },

  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    backgroundColor: COLORS.card,
    marginBottom: 8,
  },
  footer: { color: COLORS.dim, textAlign: 'center', fontSize: 12, letterSpacing: 1 },

  tabBarWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  tabBarFade: { height: 36 },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: 'rgba(10,4,32,0.96)',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.cardBorder,
    paddingBottom: Platform.OS === 'ios' ? 24 : 14,
  },
  tabItem: { flex: 1, alignItems: 'center' },
  tabActive: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
  },
  tabInactive: { padding: 10 },
  tabIcon: { color: COLORS.dim, fontSize: 18 },
  tabIconActive: { color: '#0a0420', fontWeight: '900', fontSize: 16, marginRight: 6 },
  tabLabelActive: { color: '#0a0420', fontWeight: '900', letterSpacing: 0.5 },
});
