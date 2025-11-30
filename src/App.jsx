import React, { useState, useMemo, useEffect } from 'react';
import { Search, Star, Smile, Copy, Menu, X, Sparkles, Heart, Zap, Ghost } from 'lucide-react';

// DATA MASIF - DIKURASI DARI REFERENSI POPULER + TAMBAHAN BARU
const EMOJI_DATA = [
  // --- AESTHETIC / CUTE EMOJIS (Diperluas dari emojidb.org) ---
  { char: "🌸", category: "emoji", tags: ["flower", "sakura", "bunga", "aesthetic"] },
  { char: "🎀", category: "emoji", tags: ["ribbon", "pita", "cute", "pink"] },
  { char: "🧸", category: "emoji", tags: ["bear", "boneka", "beruang", "cute"] },
  { char: "✨", category: "emoji", tags: ["sparkle", "kilau", "bintang", "magic"] },
  { char: "🩰", category: "emoji", tags: ["ballet", "sepatu", "tari", "pink"] },
  { char: "🍰", category: "emoji", tags: ["cake", "kue", "makanan", "sweet"] },
  { char: "🍓", category: "emoji", tags: ["strawberry", "buah", "merah", "pink"] },
  { char: "🫧", category: "emoji", tags: ["bubble", "gelembung", "sabun", "cute"] },
  { char: "🥺", category: "emoji", tags: ["pleading", "sedih", "cute", "eyes"] },
  { char: "🤍", category: "emoji", tags: ["white heart", "hati", "cinta", "pure"] },
  { char: "🎧", category: "emoji", tags: ["headphone", "musik", "lagu", "aesthetic"] },
  { char: "🕯️", category: "emoji", tags: ["candle", "lilin", "aesthetic", "cozy"] },
  { char: "🦢", category: "emoji", tags: ["swan", "angsa", "elegant", "white"] },
  { char: "🪞", category: "emoji", tags: ["mirror", "cermin", "kaca", "aesthetic"] },
  { char: "☁️", category: "emoji", tags: ["cloud", "awan", "langit", "soft"] },
  { char: "🍡", category: "emoji", tags: ["dango", "jepang", "manis", "food"] },
  { char: "🦋", category: "emoji", tags: ["butterfly", "kupu-kupu", "hewan", "beautiful"] },
  { char: "💒", category: "emoji", tags: ["wedding", "gereja", "nikah", "love"] },
  { char: "🥡", category: "emoji", tags: ["takeout", "makanan", "kotak", "food"] },
  { char: "🍥", category: "emoji", tags: ["narutomaki", "ramen", "jepang", "food"] },
  { char: "🩹", category: "emoji", tags: ["bandage", "luka", "plester", "care"] },
  { char: "💌", category: "emoji", tags: ["letter", "surat", "cinta", "love"] },
  { char: "🧋", category: "emoji", tags: ["boba", "bubble tea", "minum", "aesthetic"] },
  { char: "🥞", category: "emoji", tags: ["pancake", "sarapan", "kue", "food"] },
  { char: "🐰", category: "emoji", tags: ["bunny", "kelinci", "hewan", "cute"] },
  { char: "🐈", category: "emoji", tags: ["cat", "kucing", "hewan", "pet"] },
  { char: "🍞", category: "emoji", tags: ["bread", "roti", "makanan", "food"] },
  
  // --- TAMBAHAN CUTE EMOJIS ---
  { char: "🌙", category: "emoji", tags: ["moon", "bulan", "night", "aesthetic"] },
  { char: "⭐", category: "emoji", tags: ["star", "bintang", "sparkle", "night"] },
  { char: "🌟", category: "emoji", tags: ["glowing star", "bintang", "bright", "sparkle"] },
  { char: "💫", category: "emoji", tags: ["dizzy", "pusing", "sparkle", "magic"] },
  { char: "🌈", category: "emoji", tags: ["rainbow", "pelangi", "colorful", "happy"] },
  { char: "🎂", category: "emoji", tags: ["birthday cake", "kue ulang tahun", "celebration"] },
  { char: "🧁", category: "emoji", tags: ["cupcake", "kue kecil", "sweet", "cute"] },
  { char: "🍪", category: "emoji", tags: ["cookie", "kue kering", "sweet", "snack"] },
  { char: "🍭", category: "emoji", tags: ["lollipop", "permen", "sweet", "candy"] },
  { char: "🍬", category: "emoji", tags: ["candy", "permen", "sweet", "colorful"] },
  { char: "🎨", category: "emoji", tags: ["art", "seni", "creative", "colorful"] },
  { char: "📚", category: "emoji", tags: ["books", "buku", "study", "knowledge"] },
  { char: "💕", category: "emoji", tags: ["two hearts", "cinta", "love", "pink"] },
  { char: "💖", category: "emoji", tags: ["sparkling heart", "cinta", "love", "sparkle"] },
  { char: "💗", category: "emoji", tags: ["growing heart", "cinta", "love", "pink"] },
  { char: "💘", category: "emoji", tags: ["heart with arrow", "cinta", "cupid", "love"] },
  { char: "💝", category: "emoji", tags: ["heart with ribbon", "gift", "cinta", "present"] },
  { char: "🎁", category: "emoji", tags: ["gift", "hadiah", "present", "surprise"] },
  { char: "🌺", category: "emoji", tags: ["hibiscus", "bunga", "tropical", "pink"] },
  { char: "🌻", category: "emoji", tags: ["sunflower", "bunga matahari", "yellow", "happy"] },
  { char: "🌷", category: "emoji", tags: ["tulip", "bunga tulip", "spring", "pink"] },
  
  // --- KAOMOJI: MAGIC & SPARKLES (Diperluas dari emojicombos. com) ---
  { char: "ଘ(੭*ˊᵕˋ)੭* ੈ♡‧₊˚", category: "kaomoji", tags: ["magic", "sihir", "cinta", "love", "fairy"] },
  { char: "(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧", category: "kaomoji", tags: ["sparkle", "happy", "senang", "sihir", "excited"] },
  { char: "☆*:.｡. o(≧▽≦)o. ｡.:*☆", category: "kaomoji", tags: ["excited", "happy", "senang", "bintang", "joy"] },
  { char: "*:･ﾟ✧(=✪ ᆺ ✪=)*:･ﾟ✧", category: "kaomoji", tags: ["cat", "magic", "kucing", "kilau", "sparkle"] },
  { char: "(∩^o^)⊃━☆゜.*", category: "kaomoji", tags: ["wizard", "magic", "sihir", "tongkat", "wand"] },
  { char: ".:*・°☆(m_ _m)☆°・* :.", category: "kaomoji", tags: ["bow", "respect", "maaf", "hormat", "polite"] },
  { char: "ヽ(o^ ^o)ﾉ", category: "kaomoji", tags: ["happy", "dance", "senang", "tari", "celebration"] },
  { char: "°˖✧◝(⁰▿⁰)◜✧˖°", category: "kaomoji", tags: ["sparkle", "excited", "magic", "happy"] },
  { char: "☆ ～ ('▽^人)", category: "kaomoji", tags: ["greeting", "wave", "happy", "friendly"] },
  { char: "(✧ω✧)", category: "kaomoji", tags: ["sparkly eyes", "amazed", "excited", "cute"] },
  { char: "◝(⁰▿⁰)◜✧˖°", category: "kaomoji", tags: ["happy", "sparkle", "excited", "joy"] },
  { char: "ദ്ദി◝ ⩊ ◜)", category: "kaomoji", tags: ["cute", "happy", "smile", "aesthetic"] },

  // --- KAOMOJI: HUG & LOVE (Diperluas) ---
  { char: "(づ｡◕‿‿◕｡)づ", category: "kaomoji", tags: ["hug", "peluk", "cute", "affection"] },
  { char: "⊂(・▽・⊂)", category: "kaomoji", tags: ["hug", "peluk", "happy", "embrace"] },
  { char: "(つ .  •́ _ʖ •̀ .)つ", category: "kaomoji", tags: ["hug", "sad", "peluk", "sedih", "comfort"] },
  { char: "(. ❛ ᴗ ❛. )", category: "kaomoji", tags: ["smile", "simple", "senyum", "content"] },
  { char: "( ˘ ³˘)♥", category: "kaomoji", tags: ["kiss", "cium", "cinta", "love"] },
  { char: "♡(> ਊ <)♡", category: "kaomoji", tags: ["love", "cinta", "kiss", "affection"] },
  { char: "(´,,•ω•,,)♡", category: "kaomoji", tags: ["shy", "love", "malu", "cinta", "blush"] },
  { char: "(/^-^(^ ^*)/", category: "kaomoji", tags: ["friends", "hug", "teman", "peluk", "friendship"] },
  { char: "(❤ω❤)", category: "kaomoji", tags: ["love", "eyes", "cinta", "senang", "heart eyes"] },
  { char: "(｡♥‿♥｡)", category: "kaomoji", tags: ["love", "heart eyes", "romantic", "smitten"] },
  { char: "(♡˙︶˙♡)", category: "kaomoji", tags: ["love", "peaceful", "content", "happy"] },
  { char: "(´｡• ᵕ •｡`) ♡", category: "kaomoji", tags: ["love", "soft", "gentle", "affection"] },
  { char: "♡＼(￣▽￣)／♡", category: "kaomoji", tags: ["love", "celebration", "happy", "excited"] },
  { char: "(ღ˘⌣˘ღ)", category: "kaomoji", tags: ["love", "bliss", "content", "peaceful"] },
  { char: "(つ≧▽≦)つ", category: "kaomoji", tags: ["hug", "excited", "happy", "embrace"] },
  { char: "ღ(｡◕‿◕｡)ღ", category: "kaomoji", tags: ["love", "sweet", "gentle", "caring"] },
  
  // --- KAOMOJI: ANIMALS (Diperluas dengan lebih banyak variasi) ---
  { char: "ʕ •ᴥ• ʔ", category: "kaomoji", tags: ["bear", "beruang", "hewan", "cute"] },
  { char: "ʕ ⊃･ ◡ ･ ʔ⊃", category: "kaomoji", tags: ["bear", "hug", "beruang", "peluk", "embrace"] },
  { char: "ʕ´•ᴥ•`ʔ", category: "kaomoji", tags: ["bear", "sleepy", "tired", "cute"] },
  { char: "ʕ◔ᴥ◔ʔ", category: "kaomoji", tags: ["bear", "surprised", "shocked", "wide eyes"] },
  { char: "ʕ •́؈•̀ ʔ", category: "kaomoji", tags: ["bear", "grumpy", "annoyed", "pouty"] },
  { char: "(=^･ω･^=)", category: "kaomoji", tags: ["cat", "kucing", "meow", "happy"] },
  { char: "(^. _. ^)ﾉ", category: "kaomoji", tags: ["cat", "wave", "kucing", "dadah", "goodbye"] },
  { char: "/ᐠ｡ꞈ｡ᐟ\\", category: "kaomoji", tags: ["cat", "stare", "kucing", "diam", "watching"] },
  { char: "(=^･ｪ･^=)", category: "kaomoji", tags: ["cat", "happy", "content", "purr"] },
  { char: "ฅ^•ﻌ•^ฅ", category: "kaomoji", tags: ["cat", "paws", "cute", "kitty"] },
  { char: "( =①ω①=)", category: "kaomoji", tags: ["cat", "dizzy", "confused", "sleepy"] },
  { char: "(^◡^)っ", category: "kaomoji", tags: ["cat", "reaching", "wanting", "grabby"] },
  { char: "▼・ᴥ・▼", category: "kaomoji", tags: ["dog", "anjing", "hewan", "happy"] },
  { char: "U・ᴥ・U", category: "kaomoji", tags: ["dog", "anjing", "cute", "friendly"] },
  { char: "V・ᴥ・V", category: "kaomoji", tags: ["dog", "happy", "excited", "tail wag"] },
  { char: "◕‿◕", category: "kaomoji", tags: ["dog", "simple", "happy", "cute"] },
  { char: "(\\_/) ( •_•) />❤️", category: "kaomoji", tags: ["rabbit", "gift", "kelinci", "cinta", "offering"] },
  { char: "／(･ × ･)＼", category: "kaomoji", tags: ["rabbit", "kelinci", "miffy", "bunny"] },
  { char: "(\\_/)", category: "kaomoji", tags: ["rabbit", "simple", "ears", "bunny"] },
  { char: "( ͡°ᴥ ͡° ʋ)", category: "kaomoji", tags: ["dog", "lenny", "mischievous", "playful"] },
  { char: "くコ:彡", category: "kaomoji", tags: ["squid", "cumi", "laut", "sea creature"] },
  { char: "🐠 ⋆ 🦈 ⋆ 🌊", category: "kaomoji", tags: ["sea", "laut", "ikan", "hiu", "ocean"] },
  { char: "◉_◉", category: "kaomoji", tags: ["owl", "burung hantu", "stare", "wide eyes"] },
  { char: "＼(^o^)／", category: "kaomoji", tags: ["bird", "flying", "happy", "freedom"] },
  
  // --- KAOMOJI: HAPPY & JOYFUL (Tambahan dari pencarian) ---
  { char: "(＾▽＾)", category: "kaomoji", tags: ["happy", "senang", "smile", "cheerful"] },
  { char: "(* ^ ω ^)", category: "kaomoji", tags: ["happy", "content", "peaceful", "satisfied"] },
  { char: "(≧◡≦)", category: "kaomoji", tags: ["happy", "excited", "joyful", "cheerful"] },
  { char: "(o^▽^o)", category: "kaomoji", tags: ["happy", "excited", "cheerful", "bright"] },
  { char: "(⌒▽⌒)☆", category: "kaomoji", tags: ["happy", "cheerful", "bright", "optimistic"] },
  { char: "(o´▽`o)", category: "kaomoji", tags: ["happy", "gentle", "soft", "content"] },
  { char: "(´｡• ω •｡`)", category: "kaomoji", tags: ["happy", "soft", "gentle", "peaceful"] },
  { char: "＼(＾▽＾)／", category: "kaomoji", tags: ["celebration", "victory", "happy", "arms up"] },
  { char: "o(≧▽≦)o", category: "kaomoji", tags: ["excited", "thrilled", "overjoyed", "energetic"] },
  { char: "٩(˘◡˘)۶", category: "kaomoji", tags: ["excited", "celebration", "happy", "arms up"] },
  { char: "ヽ(・∀・)ﾉ", category: "kaomoji", tags: ["happy", "cheerful", "wave", "greeting"] },
  { char: "( ´ ∀ ` )ﾉ", category: "kaomoji", tags: ["greeting", "wave", "friendly", "happy"] },
  { char: "(￣▽￣)ノ", category: "kaomoji", tags: ["wave", "goodbye", "cheerful", "friendly"] },
  
  // --- KAOMOJI: BLUSHING & SHY (Tambahan) ---
  { char: "(⁎⁍̴̆Ɛ⁍̴̆⁎)", category: "kaomoji", tags: ["blush", "malu", "shy", "embarrassed"] },
  { char: "（*^_^*）", category: "kaomoji", tags: ["blush", "happy", "shy", "embarrassed"] },
  { char: "(⁎❛ᴗ❛⁎)", category: "kaomoji", tags: ["blush", "happy", "cute", "shy"] },
  { char: "(´･ᴗ･ `)", category: "kaomoji", tags: ["blush", "soft", "gentle", "shy"] },
  { char: "(>///<)", category: "kaomoji", tags: ["blush", "embarrassed", "shy", "flustered"] },
  { char: "(｡◕‿◕｡)", category: "kaomoji", tags: ["gentle", "soft", "sweet", "kind"] },
  { char: "(´∀`)", category: "kaomoji", tags: ["happy", "simple", "cheerful", "content"] },
  
  // --- KAOMOJI: SAD / CRYING / WORRIED (Diperluas) ---
  { char: "(;´༎ຶД༎ຶ`)", category: "kaomoji", tags: ["cry", "loud", "nangis", "sedih", "sobbing"] },
  { char: "( ╥ω╥ )", category: "kaomoji", tags: ["cry", "sad", "nangis", "sedih", "tears"] },
  { char: "(ノ_<、)", category: "kaomoji", tags: ["sad", "hide", "sedih", "malu", "ashamed"] },
  { char: "｡ﾟ･ (>﹏<) ･ﾟ｡", category: "kaomoji", tags: ["panic", "cry", "nangis", "panik", "distressed"] },
  { char: "(｡•́︿•̀｡)", category: "kaomoji", tags: ["pout", "sad", "ngambek", "sedih", "disappointed"] },
  { char: "(T_T)", category: "kaomoji", tags: ["cry", "nangis", "classic", "tears"] },
  { char: "(. _. )", category: "kaomoji", tags: ["down", "sad", "murung", "depressed"] },
  { char: "(⊙_⊙)", category: "kaomoji", tags: ["shock", "kaget", "bingung", "surprised"] },
  { char: "(╥_╥)", category: "kaomoji", tags: ["cry", "sad", "tears", "upset"] },
  { char: "(ノ_\u003c。)", category: "kaomoji", tags: ["sad", "crying", "hiding", "shame"] },
  { char: "（ ; _ ; ）", category: "kaomoji", tags: ["cry", "tears", "sad", "weeping"] },
  { char: "(〒︿〒)", category: "kaomoji", tags: ["cry", "sad", "dramatic", "weeping"] },
  { char: "(｡╯︵╰｡)", category: "kaomoji", tags: ["sad", "disappointed", "dejected", "down"] },
  { char: "(◞‸◟)", category: "kaomoji", tags: ["sad", "disappointed", "upset", "down"] },
  { char: "(｡•́ ︿ •̀｡)", category: "kaomoji", tags: ["sad", "worried", "concerned", "upset"] },
  
  // --- KAOMOJI: ANGRY / FLIP / ACTION (Diperluas) ---
  { char: "(╯°□°)╯︵ ┻━┻", category: "kaomoji", tags: ["flip", "table", "meja", "marah", "rage"] },
  { char: "(ノಠ益ಠ)ノ彡┻━┻", category: "kaomoji", tags: ["angry", "flip", "marah", "meja", "furious"] },
  { char: "┬─┬ノ( º _ ºノ)", category: "kaomoji", tags: ["calm", "table", "sabar", "meja", "respectful"] },
  { char: "ᕙ(⇀‸↼‶)ᕗ", category: "kaomoji", tags: ["strong", "flex", "kuat", "otot", "muscles"] },
  { char: "凸(￣ヘ￣)", category: "kaomoji", tags: ["angry", "rude", "marah", "kesal", "middle finger"] },
  { char: "(¬_¬)", category: "kaomoji", tags: ["annoyed", "sebal", "sideeye", "judgmental"] },
  { char: "ε=ε=ε=ε=┌(;￣▽￣)┘", category: "kaomoji", tags: ["run", "lari", "kabur", "escape"] },
  { char: "C= C= C= C=┌( `ー´)┘", category: "kaomoji", tags: ["run", "lari", "semangat", "determined"] },
  { char: "(*￣ii￣)", category: "kaomoji", tags: ["nosebleed", "mimisan", "hot", "excited"] },
  { char: "(╬ಠ益ಠ)", category: "kaomoji", tags: ["angry", "furious", "mad", "rage"] },
  { char: "(`皿´＃)", category: "kaomoji", tags: ["angry", "irritated", "annoyed", "mad"] },
  { char: "( ` ω ´ )", category: "kaomoji", tags: ["annoyed", "pouty", "grumpy", "moody"] },
  { char: "(；⌣̀_⌣́)", category: "kaomoji", tags: ["annoyed", "irritated", "bothered", "upset"] },
  
  // --- KAOMOJI: WEIRD / MEME / FUN (Diperluas) ---
  { char: "( •_•)>⌐■-■", category: "kaomoji", tags: ["cool", "glasses", "keren", "putting on"] },
  { char: "(⌐■_■)", category: "kaomoji", tags: ["cool", "deal", "keren", "sunglasses"] },
  { char: "¯\\_(ツ)_/¯", category: "kaomoji", tags: ["shrug", "dunno", "bingung", "bahu", "whatever"] },
  { char: "uwu", category: "kaomoji", tags: ["uwu", "cute", "text", "soft"] },
  { char: "owo", category: "kaomoji", tags: ["owo", "shock", "text", "surprised"] },
  { char: "ಠ_ಠ", category: "kaomoji", tags: ["stare", "serious", "serius", "diam", "disapproval"] },
  { char: "( ͡° ͜ʖ ͡°)", category: "kaomoji", tags: ["lenny", "face", "meme", "nakal", "mischievous"] },
  { char: "[ ± _ ± ]", category: "kaomoji", tags: ["dead", "robot", "mati", "lifeless"] },
  { char: "┐( ˘_˘ )┌", category: "kaomoji", tags: ["whatever", "terserah", "bodoamat", "indifferent"] },
  { char: "(´• ω •`)", category: "kaomoji", tags: ["innocent", "pure", "soft", "gentle"] },
  { char: "(◕‿◕)✿", category: "kaomoji", tags: ["flower", "happy", "cheerful", "blooming"] },
  { char: "┌( ◕ 人 ◕ )┐", category: "kaomoji", tags: ["dunno", "confused", "shrug", "clueless"] },
  
  // --- AESTHETIC TEXT/LINES & SYMBOLS (Diperluas) ---
  { char: "─── ⋆⋅☆⋅⋆ ───", category: "kaomoji", tags: ["line", "divider", "garis", "aesthetic"] },
  { char: "•────────•°•❀•°•────────•", category: "kaomoji", tags: ["flower", "line", "garis", "decorative"] },
  { char: "✧･ﾟ: *✧･ﾟ:*", category: "kaomoji", tags: ["sparkle", "stars", "bintang", "magic"] },
  { char: "｡･:*:･ﾟ★,｡･:*:･ﾟ☆", category: "kaomoji", tags: ["stars", "bintang", "malam", "night"] },
  { char: "⋆｡ﾟ☁︎｡⋆｡ ﾟ☾ ﾟ｡⋆", category: "kaomoji", tags: ["sky", "cloud", "moon", "aesthetic"] },
  { char: "⋆ ˚｡‧₊˚ ⋆‧₊˚✩‧₊˚⋆", category: "kaomoji", tags: ["stars", "sparkle", "decorative", "aesthetic"] },
  { char: "＊*•̩̩͙✩•̩̩͙*˚ ⋆", category: "kaomoji", tags: ["sparkle", "decorative", "stars", "fancy"] },
  { char: "♡‧₊˚ ₊˚⊹✧˖°", category: "kaomoji", tags: ["love", "heart", "sparkle", "aesthetic"] },
  { char: "✨💖💗💓💞💕", category: "kaomoji", tags: ["hearts", "love", "sparkle", "pink"] },
  { char: "⋆˙⟡♡ ₊˚⊹♡", category: "kaomoji", tags: ["love", "sun", "heart", "aesthetic"] },
  { char: "˚₊‧ ꒰ა 𓂋 ໒꒱ ‧₊˚", category: "kaomoji", tags: ["decorative", "aesthetic", "symbols", "cute"] },
  { char: "ʚ♡ɞ˚‧｡⋆", category: "kaomoji", tags: ["heart", "wings", "angel", "love"] },
  { char: "₊˚⊹♡🎀 ⋆. ✦", category: "kaomoji", tags: ["bow", "heart", "cute", "pink"] },
  { char: "⋆｡˚୨୧˚｡⋆", category: "kaomoji", tags: ["decorative", "aesthetic", "symbols", "soft"] },
  { char: "⋆. ୨୧. ⋆", category: "kaomoji", tags: ["simple", "aesthetic", "decorative", "minimal"] },
];

export default function Haimoji() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [installPrompt, setInstallPrompt] = useState(null);
  const [showInstallModal, setShowInstallModal] = useState(false);

  // Filter logic yang dioptimalkan dengan useMemo
  const filteredData = useMemo(() => {
    return EMOJI_DATA.filter(item => {
      const matchesTab = activeTab === 'all' || item.category === activeTab;
      const lowerQuery = searchQuery.toLowerCase();
      const matchesSearch = item.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
                            item.char.toLowerCase().includes(lowerQuery);
      return matchesTab && matchesSearch;
    });
  }, [activeTab, searchQuery]);

  const handleCopy = (char) => {
    navigator.clipboard.writeText(char);
    showToast(`Disalin: ${char}`);
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2000);
  };

  // PWA Install Prompt
  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setInstallPrompt(e);
      setShowInstallModal(true);
    };

    const handleAppInstalled = () => {
      setInstallPrompt(null);
      setShowInstallModal(false);
      showToast('Aplikasi berhasil diinstall!');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (installPrompt) {
      installPrompt.prompt();
      const { outcome } = await installPrompt.userChoice;
      if (outcome === 'accepted') {
        showToast('Installing...');
      }
      setInstallPrompt(null);
      setShowInstallModal(false);
    }
  };

  // Helper untuk Chips
  const quickFilters = [
    { label: 'Magic', icon: <Sparkles size={12}/>, key: 'magic' },
    { label: 'Cinta', icon: <Heart size={12}/>, key: 'cinta' },
    { label: 'Nangis', icon: <Ghost size={12}/>, key: 'nangis' },
    { label: 'Marah', icon: <Zap size={12}/>, key: 'marah' },
    { label: 'Hewan', icon: <Smile size={12}/>, key: 'hewan' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 font-sans text-gray-800 selection:bg-pink-200 selection:text-pink-900">
      
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-pink-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo */}
            <div 
              className="flex items-center gap-2 cursor-pointer group" 
              onClick={() => {setActiveTab('all'); setSearchQuery(''); window.scrollTo({top: 0, behavior: 'smooth'})}}
            >
              <div className="bg-gradient-to-tr from-pink-500 to-purple-500 p-2 rounded-xl rotate-3 shadow-lg group-hover:rotate-12 transition-all duration-300">
                <Sparkles className="text-white w-6 h-6" />
              </div>
              <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-purple-600 tracking-tight">
                Haimoji
              </h1>
            </div>

            {/* Desktop Tabs */}
            <div className="hidden md:flex items-center gap-1 bg-pink-50/80 p-1.5 rounded-full border border-pink-100/50">
              <TabButton 
                active={activeTab === 'all'} 
                onClick={() => setActiveTab('all')} 
                icon={<Star className="w-4 h-4" />}
                label="Semua"
              />
              <TabButton 
                active={activeTab === 'emoji'} 
                onClick={() => setActiveTab('emoji')} 
                icon={<Smile className="w-4 h-4" />}
                label="Emoji"
              />
              <TabButton 
                active={activeTab === 'kaomoji'} 
                onClick={() => setActiveTab('kaomoji')} 
                icon={<span className="text-xs font-bold font-mono">^._.^</span>}
                label="Kaomoji"
              />
            </div>

             {/* Search Bar - Desktop */}
             <div className="hidden md:block relative w-72">
                <input
                  type="text"
                  placeholder="Cari mood kamu... (eg: magic)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all shadow-sm text-sm placeholder-pink-300 text-pink-700"
                />
                <Search className="absolute left-3.5 top-3 text-pink-400 w-4 h-4" />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-3 text-pink-300 hover:text-pink-500"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
             </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-pink-500 hover:bg-pink-50 rounded-lg transition-colors">
                {isMenuOpen ?  <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden px-4 pb-6 bg-white/95 border-b border-pink-100 shadow-xl animate-fade-in-down">
            <div className="flex flex-col space-y-3 mt-3">
               <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Cari..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-pink-50 border-none focus:ring-2 focus:ring-pink-400 text-pink-700 placeholder-pink-300"
                />
                <Search className="absolute left-3 top-3.5 text-pink-400 w-5 h-5" />
             </div>
             <div className="grid grid-cols-3 gap-2">
                <MobileTabButton 
                  active={activeTab === 'all'} 
                  onClick={() => { setActiveTab('all'); setIsMenuOpen(false); }}
                  label="Semua"
                />
                <MobileTabButton 
                  active={activeTab === 'emoji'} 
                  onClick={() => { setActiveTab('emoji'); setIsMenuOpen(false); }}
                  label="Emoji"
                />
                <MobileTabButton 
                  active={activeTab === 'kaomoji'} 
                  onClick={() => { setActiveTab('kaomoji'); setIsMenuOpen(false); }}
                  label="Kaomoji"
                />
             </div>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Header & Quick Filters - UPDATED */}
        <div className="flex flex-col items-center mb-12 space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-3xl md:text-5xl font-black text-gray-800 tracking-tight">
              Sesuaikan <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">Mood Mu</span>
            </h2>
            <p className="text-gray-500 text-lg font-medium">Klik untuk copy.</p>
          </div>

          {/* Chips Filter */}
          <div className="flex flex-wrap justify-center gap-2">
            {quickFilters.map((filter) => (
              <button
                key={filter.key}
                onClick={() => setSearchQuery(filter.key)}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 border
                  ${searchQuery.toLowerCase() === filter.key
                    ? 'bg-pink-500 text-white border-pink-600 shadow-md transform scale-105' 
                    : 'bg-white text-gray-600 border-gray-200 hover:border-pink-300 hover:text-pink-500 hover:shadow-sm'
                  }
                `}
              >
                {filter.icon} {filter.label}
              </button>
            ))}
             {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="px-4 py-2 rounded-full text-sm font-medium text-pink-500 hover:bg-pink-50 transition-colors"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Grid Area */}
        {filteredData.length > 0 ?  (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 pb-20">
            {filteredData.map((item, index) => (
              <button
                key={`${item.char}-${index}`}
                onClick={() => handleCopy(item.char)}
                className="group relative bg-white rounded-2xl p-4 h-32 md:h-36 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] border border-pink-50 hover:border-pink-400 hover:shadow-[0_8px_20px_-6px_rgba(236,72,153,0.3)] hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center gap-3 overflow-hidden"
              >
                {/* Background Decoration */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-pink-100 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-bl-3xl" />
                
                {/* Character */}
                <span className={`relative z-10 transition-transform duration-300 group-hover:scale-110 
                  ${item.category === 'kaomoji' 
                    ? 'text-lg font-medium tracking-wide break-all text-center leading-tight px-1' 
                    : 'text-5xl'
                  }`}
                >
                  {item.char}
                </span>
                
                {/* Hover Text */}
                <div className="opacity-0 group-hover:opacity-100 absolute bottom-3 text-[10px] font-bold tracking-wider text-pink-500 uppercase bg-pink-50 px-3 py-1 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  Salin
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="text-7xl mb-6 animate-bounce opacity-80">👻</div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">Yah, kosong... </h3>
            <p className="text-gray-400 max-w-md mx-auto">
              Tidak ditemukan hasil untuk "{searchQuery}". Coba kata kunci lain seperti "beruang", "sihir", atau "cinta".
            </p>
            <button 
              onClick={() => setSearchQuery('')}
              className="mt-8 px-8 py-3 bg-pink-500 text-white rounded-full font-bold shadow-lg hover:bg-pink-600 hover:shadow-pink-200/50 transition-all"
            >
              Hapus Pencarian
            </button>
          </div>
        )}
      </main>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 animate-bounce-short">
          <div className="bg-gray-900/95 backdrop-blur-sm text-white pl-4 pr-6 py-3 rounded-full shadow-2xl flex items-center gap-3 border border-gray-700">
            <div className="bg-green-500 rounded-full p-1">
              <Copy className="w-3 h-3 text-white" />
            </div>
            <span className="font-medium text-sm">{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Footer */}
         <footer className="bg-white border-t border-pink-100 py-10 mt-auto">
        <div className="max-w-6xl mx-auto px-4 text-center space-y-2">
          <p className="text-pink-500 font-bold flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4" /> Haimoji
          </p>
          <p className="text-gray-400 text-sm">
            Koleksi Kaomoji & Emoji paling <span className="text-pink-400">aesthetic</span> untukmu. 
          </p>

          {/* credit line */}
          <p className="text-xs text-gray-500 mt-2">
            Developed by Ghiffa © 2023
          </p>
        </div>
      </footer>

      {/* Install Modal */}
      {showInstallModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 max-w-sm mx-4 shadow-2xl border border-pink-100">
            <div className="text-center space-y-4">
              <div className="bg-gradient-to-tr from-pink-500 to-purple-500 p-3 rounded-xl w-fit mx-auto">
                <Sparkles className="text-white w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Install Haimoji</h3>
              <p className="text-gray-600 text-sm">
                Tambahkan Haimoji ke layar utama untuk akses cepat dan offline!
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowInstallModal(false)}
                  className="flex-1 py-2 px-4 text-gray-600 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
                >
                  Nanti
                </button>
                <button
                  onClick={handleInstallClick}
                  className="flex-1 py-2 px-4 bg-pink-500 text-white rounded-full font-semibold hover:bg-pink-600 transition-colors"
                >
                  Install
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CSS Animations */}
      <style>{`
        @keyframes bounce-short {
          0%, 100% { transform: translate(-50%, 0); }
          50% { transform: translate(-50%, -12px); }
        }
        .animate-bounce-short {
          animation: bounce-short 0.4s cubic-bezier(0.18, 0.89, 0.32, 1.28);
        }
        @keyframes fade-in-down {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-down {
          animation: fade-in-down 0.2s ease-out;
        }
      `}</style>
    </div>
  );
}

// Sub-components untuk keterbacaan
function TabButton({ active, onClick, icon, label }) {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300
        ${active 
          ? 'bg-white text-pink-600 shadow-md ring-1 ring-black/5 scale-100' 
          : 'text-gray-500 hover:text-pink-500 hover:bg-white/60 scale-95 hover:scale-100'
        }
      `}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

function MobileTabButton({ active, onClick, label }) {
  return (
    <button 
      onClick={onClick}
      className={`
        py-2 rounded-xl text-sm font-semibold transition-colors
        ${active ?  'bg-pink-100 text-pink-700' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}
      `}
    >
      {label}
    </button>
  );
}