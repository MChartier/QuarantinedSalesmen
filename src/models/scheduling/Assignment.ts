import Workshop from "../workshops/Workshop";
import Traveler from "../travelers/Traveler";

export default interface Assignment {
  travelers: Traveler[];
  workshop: Workshop;
}