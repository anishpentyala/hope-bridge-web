const BANNED_TERMS = [
  // F-word variants
  'fuck', 'fucking', 'fucker', 'fucked', 'fucks', 'fuk', 'fck', 'f u c k',
  // S-word variants
  'shit', 'shitty', 'shitting', 'shits', 'sht',
  // B-words
  'bitch', 'bitches', 'bitching', 'biatch',
  'bastard', 'bastards',
  // A-words
  'asshole', 'assholes', 'ass', 'asses',
  // C-words
  'cunt', 'cunts',
  // D-words
  'dick', 'dicks', 'dickhead',
  // P-words
  'pussy', 'pussies',
  // Slurs
  'nigger', 'nigga', 'niggas', 'n i g g e r',
  'faggot', 'faggots', 'fag', 'fags',
  'retard', 'retarded', 'retards',
  'spic', 'spics',
  'kike', 'kikes',
  'chink', 'chinks',
  'wetback', 'wetbacks',
  // Sexual
  'slut', 'sluts',
  'whore', 'whores',
  'motherfucker', 'mf',
  // Violence/threats
  'kill yourself', 'kys',
  'go die',
  'kill you',
];

const LEET_MAP = {
  '0': 'o',
  '1': 'i',
  '3': 'e',
  '4': 'a',
  '5': 's',
  '7': 't',
  '@': 'a',
  '$': 's',
  '!': 'i'
};

const normalizeText = (input = '') =>
  input
    .toLowerCase()
    .split('')
    .map((char) => LEET_MAP[char] || char)
    .join('')
    .replace(/[^a-z\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const containsBannedTerm = (text) => {
  const normalized = normalizeText(text);
  // Pad with spaces for word-boundary matching on single words
  const padded = ` ${normalized} `;

  for (const term of BANNED_TERMS) {
    if (term.includes(' ')) {
      // Multi-word phrase: check as substring in normalized text
      if (normalized.includes(term)) return term;
    } else {
      // Single word: match on word boundaries (space-padded)
      if (padded.includes(` ${term} `)) return term;
    }
  }

  return null;
};

export const moderateStoryText = ({ title = '', content = '' }) => {
  const combined = `${title} ${content}`.trim();
  const matchedTerm = containsBannedTerm(combined);

  if (!matchedTerm) {
    return { isClean: true, reason: null };
  }

  return {
    isClean: false,
    reason: `Your story could not be posted because it may contain inappropriate language.`
  };
};
