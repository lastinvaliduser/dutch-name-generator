export const nationalities = [
  { id: 'english', label: 'English', flag: '🇬🇧' },
  { id: 'spanish', label: 'Spanish', flag: '🇪🇸' },
  { id: 'french', label: 'French', flag: '🇫🇷' },
  { id: 'german', label: 'German', flag: '🇩🇪' },
  { id: 'italian', label: 'Italian', flag: '🇮🇹' },
  { id: 'polish', label: 'Polish', flag: '🇵🇱' },
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
  "Jan": "God is gracious", "Willem": "Resolute protector", "Pieter": "Rock", "Maria": "Wished-for child",
  "Sjors": "Farmer", "Jacob": "Supplanter", "Karel": "Free man", "Richard": "Brave ruler",
  "Michiel": "Who is like God?", "David": "Beloved", "Jozef": "God will add", "Thomas": "Twin",
  "Rob": "Bright fame", "Anton": "Priceless", "Matthijs": "Gift of God", "Stefan": "Crown",
  "Andries": "Manly", "Paul": "Humble", "Mark": "Warlike", "Kees": "Horn of plenty",
  "Bram": "Father of multitudes", "Saar": "Princess", "Lijsbeth": "God is my oath", "Jessica": "Foresight",
  "Maaike": "Bitter/Beloved", "Rian": "Little king", "Jaap": "Supplanter", "Anna": "Grace",
  "Isabella": "Devoted to God", "Lodewijk": "Famous warrior", "Dirk": "Ruler of the people", "Hendrik": "Home ruler",
  "Sjaak": "Supplanter", "Emma": "Whole or universal", "Sophie": "Wisdom", "Julia": "Youthful",
  "Mila": "Gracious", "Tess": "Harvester", "Lotte": "Free woman", "Zoe": "Life",
  "Fleur": "Flower", "Roos": "Rose", "Sem": "Renown", "Lucas": "Bringer of light",
  "Daan": "God is my judge", "Levi": "Attached", "Luuk": "Bringer of light", "Mees": "Son of Talmai",
  "Noud": "Eagle ruler", "Finn": "Fair", "Milan": "Gracious", "Jesse": "Gift"
};

const getMeaning = (firstName) => {
  return nameMeanings[firstName] || "A beautiful classic Dutch name";
};

const maleNames = ["Daan", "Sem", "Lucas", "Milan", "Levi", "Luuk", "Bram", "Finn", "Jesse", "Max", "Lars", "Thijs", "Niels", "Koen", "Bas"];
const femaleNames = ["Emma", "Julia", "Mila", "Tess", "Sophie", "Zoe", "Sara", "Nora", "Yara", "Lotte", "Sanne", "Lieke", "Roos", "Maud", "Fleur"];
const modernNames = ["Mees", "Guus", "Jurre", "Vigo", "Boaz", "Noa", "Liv", "Elin", "Luna", "Fien"];

/**
 * Hash string to a number
 */
const hashCode = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return Math.abs(hash);
};

export const generateDutchName = (firstName, lastName, nationalityId, gender) => {
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

  let exactTranslation = nameDictionary[normalizedFirstName];
  const options = [];

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
