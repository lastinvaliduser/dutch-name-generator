export const nationalities = [
  { id: 'english', label: 'English', flag: '🇬🇧' },
  { id: 'spanish', label: 'Spanish', flag: '🇪🇸' },
  { id: 'french', label: 'French', flag: '🇫🇷' },
  { id: 'german', label: 'German', flag: '🇩🇪' },
  { id: 'italian', label: 'Italian', flag: '🇮🇹' },
  { id: 'turkish', label: 'Turkish', flag: '🇹🇷' },
  { id: 'other', label: 'Rest of the world', flag: '🌍' }
];

export const nameDictionary = {
  // English
  john: "Jan", william: "Willem", peter: "Pieter", mary: "Maria",
  george: "Sjors", james: "Jacob", charles: "Karel", richard: "Richard",
  michael: "Michiel", david: "David", joseph: "Jozef", thomas: "Thomas",
  robert: "Rob", anthony: "Anton", matthew: "Matthijs", steven: "Stefan",
  andrew: "Andries", paul: "Paul", mark: "Mark", kevin: "Kees",
  brian: "Bram", sarah: "Saar", elizabeth: "Lijsbeth", jessica: "Jessica",
  emily: "Maaike", ryan: "Rian", jacob: "Jaap",

  // Spanish
  juan: "Jan", pedro: "Pieter", carlos: "Karel", miguel: "Michiel",
  jorge: "Sjors", jose: "Jozef", maria: "Maria", ana: "Anna",
  isabel: "Isabella", luis: "Lodewijk", antonio: "Anton", pablo: "Paul",
  diego: "Dirk", enrique: "Hendrik",

  // French
  jean: "Jan", pierre: "Pieter", michel: "Michiel", georges: "Sjors",
  marie: "Maria", anne: "Anna", isabelle: "Isabella", louis: "Lodewijk",
  antoine: "Anton", jacques: "Sjaak", guillaume: "Willem", henri: "Hendrik",

  // German
  johann: "Jan", karl: "Karel", georg: "Sjors", ludwig: "Lodewijk",
  wilhelm: "Willem", heinrich: "Hendrik", matthias: "Matthijs", stephan: "Stefan"
};

const commonDutchLastNames = [
  "de Jong", "Jansen", "de Vries", "van den Berg", "van Dijk",
  "Bakker", "Janssen", "Visser", "Smit", "Meijer",
  "de Boer", "Mulder", "de Groot", "Bos", "Vos",
  "Peters", "Hendriks", "van Leeuwen", "Dekker", "Brouwer",
  "de Wit", "Dijkstra", "Smits", "de Graaf", "van der Meer"
];

const nameMeanings = {
  // English mappings
  "Jan": "God is gracious", "Willem": "Resolute protector", "Pieter": "Rock", "Maria": "Wished-for child",
  "Sjors": "Farmer", "Jacob": "Supplanter", "Karel": "Free man", "Richard": "Brave ruler",
  "Michiel": "Who is like God?", "David": "Beloved", "Jozef": "God will add", "Thomas": "Twin",
  "Rob": "Bright fame", "Anton": "Priceless", "Matthijs": "Gift of God", "Stefan": "Crown",
  "Andries": "Manly", "Paul": "Humble", "Mark": "Warlike", "Kees": "Horn of plenty",
  "Bram": "Father of multitudes", "Saar": "Princess", "Lijsbeth": "God is my oath", "Jessica": "Foresight",
  "Maaike": "Bitter/Beloved", "Rian": "Little king", "Jaap": "Supplanter", "Anna": "Grace",
  "Isabella": "Devoted to God", "Lodewijk": "Famous warrior", "Dirk": "Ruler of the people", "Hendrik": "Home ruler",
  "Sjaak": "Supplanter", "Emma": "Universal", "Sophie": "Wisdom", "Julia": "Youthful",
  "Mila": "Gracious", "Tess": "Harvester", "Lotte": "Free woman", "Zoe": "Life",
  "Fleur": "Flower", "Roos": "Rose", "Sem": "Renown", "Lucas": "Bringer of light",
  "Daan": "God is my judge", "Levi": "Attached", "Luuk": "Bringer of light", "Mees": "Son of Talmai",
  "Noud": "Eagle ruler", "Finn": "Fair", "Milan": "Gracious", "Jesse": "Gift",

  // Extended Female
  "Sanne": "Lily", "Lieke": "Angelic", "Maud": "Mighty in battle", "Fien": "He will add",
  "Elin": "Sun ray", "Liv": "Life", "Luna": "Moon", "Noa": "Motion",
  "Yara": "Water lady", "Nora": "Light", "Sara": "Princess", "Evi": "Life",
  "Eva": "Life", "Fenja": "Peaceful", "Milou": "Famous warrior", "Suus": "Lily",
  "Isa": "God is my oath", "Floor": "Flourishing", "Merel": "Blackbird", "Sterre": "Star",

  // Extended Male
  "Max": "Greatest", "Lars": "Crowned with laurel", "Thijs": "Gift of God", "Niels": "Victory of the people",
  "Koen": "Bold advisor", "Bas": "Venerable", "Guus": "Staff of the Goths", "Jurre": "Strong",
  "Vigo": "War", "Boaz": "Swiftness", "Tim": "Honoring God", "Stijn": "Stone",
  "Ruben": "Behold, a son", "Jeroen": "Holy name", "Martijn": "Of Mars", "Joris": "Farmer",
  "Teun": "Priceless", "Gijs": "Bright pledge", "Jelle": "Value", "Wout": "Ruler of the army"
};

const getMeaning = (firstName: string): string => {
  return (nameMeanings as Record<string, string>)[firstName] || "A beautiful classic Dutch name";
};

const maleNames = ["Daan", "Sem", "Lucas", "Milan", "Levi", "Luuk", "Bram", "Finn", "Jesse", "Max", "Lars", "Thijs", "Niels", "Koen", "Bas", "Tim", "Stijn", "Ruben", "Jeroen", "Martijn", "Joris", "Teun", "Gijs", "Jelle", "Wout"];
const femaleNames = ["Emma", "Julia", "Mila", "Tess", "Sophie", "Zoe", "Sara", "Nora", "Yara", "Lotte", "Sanne", "Lieke", "Roos", "Maud", "Fleur", "Evi", "Eva", "Fenja", "Milou", "Suus", "Isa", "Floor", "Merel", "Sterre"];
const modernNames = ["Mees", "Guus", "Jurre", "Vigo", "Boaz", "Noa", "Liv", "Elin", "Luna", "Fien", "Noud", "Sem", "Finn", "Mila", "Zoe"];

/**
 * Hash string to a number
 */
const hashCode = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return Math.abs(hash);
};

export interface NameOption {
  type: string;
  fullName: string;
  isMapped: boolean;
  meaning: string;
}

export const generateDutchName = (firstName: string, lastName: string, nationalityId: string, gender: string): NameOption[] | null => {
  const normalizedFirstName = firstName.trim().toLowerCase();
  const normalizedLastName = lastName.trim().toLowerCase();

  if (!normalizedFirstName || !normalizedLastName) return null;

  let isLikelyFemale;
  if (gender === 'female') {
    isLikelyFemale = true;
  } else if (gender === 'male') {
    isLikelyFemale = false;
  } else {
    isLikelyFemale = ["a", "e", "i", "y"].includes(normalizedFirstName.slice(-1));
  }

  const baseList = isLikelyFemale ? femaleNames : maleNames;

  const hash = hashCode(normalizedFirstName + nationalityId);
  const hashLast = hashCode(normalizedLastName + nationalityId);

  const primaryLastName = commonDutchLastNames[hashLast % commonDutchLastNames.length];
  const altLastName1 = commonDutchLastNames[(hashLast + 1) % commonDutchLastNames.length];
  const altLastName2 = commonDutchLastNames[(hashLast + 2) % commonDutchLastNames.length];

  let exactTranslation = (nameDictionary as Record<string, string>)[normalizedFirstName];
  const options: NameOption[] = [];

  if (exactTranslation) {
    options.push({
      type: 'Direct Translation',
      fullName: `${exactTranslation} ${primaryLastName}`,
      isMapped: true,
      meaning: getMeaning(exactTranslation)
    });

    options.push({
      type: 'Classic Pick',
      fullName: `${baseList[hash % baseList.length]} ${altLastName1}`,
      isMapped: false,
      meaning: getMeaning(baseList[hash % baseList.length])
    });

    options.push({
      type: 'Modern Choice',
      fullName: `${modernNames[hash % modernNames.length]} ${altLastName2}`,
      isMapped: false,
      meaning: getMeaning(modernNames[hash % modernNames.length])
    });
  } else {
    options.push({
      type: 'Closest Match',
      fullName: `${baseList[hash % baseList.length]} ${primaryLastName}`,
      isMapped: false,
      meaning: getMeaning(baseList[hash % baseList.length])
    });

    options.push({
      type: 'Classic Pick',
      fullName: `${baseList[(hash + 3) % baseList.length]} ${altLastName1}`,
      isMapped: false,
      meaning: getMeaning(baseList[(hash + 3) % baseList.length])
    });

    options.push({
      type: 'Modern Choice',
      fullName: `${modernNames[hash % modernNames.length]} ${altLastName2}`,
      isMapped: false,
      meaning: getMeaning(modernNames[hash % modernNames.length])
    });
  }

  return options;
};
