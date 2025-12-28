const SOURCES=[
  "Emporio","Mezzo","Tetto (L)","Tetto (R)",
  "Wine Cellar","Liquor Closet","Prep Cooler","Other"
];

const SOURCE_ICONS = {
  "Emporio": "EmporioTransparent.png",
  "Mezzo": "MezzoTransparent.png",
  "Tetto (L)": "TettoLeftTransparent.png",
  "Tetto (R)": "TettoRightTransparent.png",
  "Liquor Closet": "LiquorClosetTransparent.png",
  "Wine Cellar": "WineCellarTransparent.png",
  "Prep Cooler": "PrepCoolerTransparent.png",
  "Other": "OtherTransparent.png"
};

let items=[];
let Source="Emporio";

const UNDO_LIMIT = 5;
