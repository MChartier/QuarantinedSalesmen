import Workshop from "../workshops/Workshop";
import Traveler from "../travelers/Traveler";

export default interface Assignment {
  traveler: Traveler;
  workshop: Workshop;
}