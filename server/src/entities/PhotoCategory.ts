import { registerEnumType } from "type-graphql";

export enum PhotoCategory {
  Selfie = "SELFIE",
  Portrait = "PORTRAIT",
  Action= "ACTION",
  Landscape= "LANDSCAPE",
  Graphic= "GRAPHIC",
}

registerEnumType(PhotoCategory, {
  name: "PhotoCategory"
})
