const rawData = {
  'Jean': ['firstName'],
  'Dupond': ['lastName'],
  'supervision@allianz.fr': ['emailAddress', 'email'],
  '0656050656': ['phoneNumber'],
  '03/05/2001': ['birthDate', 'dateOfBirth'],
  '92000': ['postalCodeHealth', 'zipCode'],
  'FX442KR': ['immatNumber'],
  '20': ['licenseObtainedAge', 'addressNumber'],
  '04/2023': ['purchaseDate'],
  'Boulevard allianz': ['addressName'],
  '09/01/2022': ['licenseIssueDate']
}

const idToValueMap = new Map()

for (const [value, keys] of Object.entries(rawData)) {
  keys.forEach(key => {
    idToValueMap.set(key.toLowerCase(), value);
  })
}

const GuessValueFromId = (id) => {
  for (const [key, value] of idToValueMap) {
    if (key.includes(id.toLowerCase())) {
      return value
    }
  }
  return 'Lorem ipsum'
};

export default GuessValueFromId