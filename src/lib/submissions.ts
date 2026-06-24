import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

export interface RecipeSubmission {
  name: string; // submitter's name
  city?: string;
  recipeName: string;
  products: string[]; // Anveshan product ids used
  story: string; // description / how they made it
}

// Writes a community recipe submission. Stored as status: "pending" —
// the Anveshan team can mark the best ones featured: true.
export async function submitRecipe(data: RecipeSubmission): Promise<void> {
  await addDoc(collection(db, "submissions"), {
    ...data,
    status: "pending",
    featured: false,
    createdAt: serverTimestamp(),
  });
}
