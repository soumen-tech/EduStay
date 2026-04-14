export type Institution = {
  id: string;
  name: string;
  type: "College" | "Office";
};

export type City = {
  id: string;
  name: string;
  institutions: Institution[];
};

export type State = {
  id: string;
  name: string;
  cities: City[];
};

export const locationsData: State[] = [
  {
    id: "west-bengal",
    name: "West Bengal",
    cities: [
      {
        id: "adisaptagram",
        name: "Adisaptagram",
        institutions: [
          { id: "aot", name: "Academy of Technology", type: "College" },
        ],
      },
      {
        id: "kolkata",
        name: "Kolkata",
        institutions: [
          { id: "ju", name: "Jadavpur University", type: "College" },
          { id: "sector-5", name: "Sector V IT Park", type: "Office" },
          { id: "new-town", name: "New Town Tech Hub", type: "Office" },
          { id: "heritage", name: "Heritage Institute of Technology", type: "College" },
        ],
      },
    ],
  },
  {
    id: "karnataka",
    name: "Karnataka",
    cities: [
      {
        id: "bangalore",
        name: "Bangalore",
        institutions: [
          { id: "manyata", name: "Manyata Tech Park", type: "Office" },
          { id: "electronic-city", name: "Electronic City Phase 1", type: "Office" },
          { id: "christ", name: "Christ University", type: "College" },
          { id: "pes", name: "PES University", type: "College" },
          { id: "whitefield", name: "Whitefield Tech Park", type: "Office" },
        ],
      },
      {
        id: "mysore",
        name: "Mysore",
        institutions: [
          { id: "infosys-mys", name: "Infosys Campus", type: "Office" },
          { id: "sjce", name: "SJCE", type: "College" },
        ],
      },
    ],
  },
  {
    id: "maharashtra",
    name: "Maharashtra",
    cities: [
      {
        id: "pune",
        name: "Pune",
        institutions: [
          { id: "hinjewadi", name: "Hinjewadi IT Park", type: "Office" },
          { id: "symbiosis", name: "Symbiosis International", type: "College" },
          { id: "kharadi", name: "EON IT Park Kharadi", type: "Office" },
          { id: "vit-pune", name: "VIT Pune", type: "College" },
        ],
      },
      {
        id: "mumbai",
        name: "Mumbai",
        institutions: [
          { id: "iit-b", name: "IIT Bombay", type: "College" },
          { id: "bkc", name: "Bandra Kurla Complex (BKC)", type: "Office" },
          { id: "nmims", name: "NMIMS", type: "College" },
          { id: "powai-tech", name: "Powai Commercial Hub", type: "Office" },
        ],
      },
    ],
  },
  {
    id: "delhi-ncr",
    name: "Delhi NCR",
    cities: [
      {
        id: "delhi",
        name: "New Delhi",
        institutions: [
          { id: "du-north", name: "Delhi University (North Campus)", type: "College" },
          { id: "du-south", name: "Delhi University (South Campus)", type: "College" },
          { id: "iit-d", name: "IIT Delhi", type: "College" },
        ],
      },
      {
        id: "gurgaon",
        name: "Gurgaon",
        institutions: [
          { id: "dlf-cyber", name: "DLF Cyber City", type: "Office" },
          { id: "udyog", name: "Udyog Vihar", type: "Office" },
          { id: "golf-course", name: "Golf Course Road", type: "Office" },
        ],
      },
      {
        id: "noida",
        name: "Noida",
        institutions: [
          { id: "amity", name: "Amity University", type: "College" },
          { id: "sector-62", name: "Sector 62 IT Park", type: "Office" },
        ],
      },
    ],
  },
];
