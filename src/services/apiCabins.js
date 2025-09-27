import supabase from "./supabase";
import { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("Cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  //
  console.log(newCabin);

  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  //https://ywgmhoapmhjzmmxgtbse.supabase.co/storage/v1/object/public/cabin-images//cabin-001.jpg

  //1. create cabin

  let query = supabase.from("Cabins");

  //A create cabin
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  //b edit cabin
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be created");
  }

  //upload the image

  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  ///3. Delete the cabin is there was an error
  if (storageError) {
    await supabase.from("Cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error("Cabin image could not be uploaded");
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("Cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be deleted");
  }

  return data;
}

// export async function createCabin(newCabin) {
//   const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
//     "/",
//     ""
//   );

//   const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

//   //https://ywgmhoapmhjzmmxgtbse.supabase.co/storage/v1/object/public/cabin-images//cabin-001.jpg

//   //1. create cabin
//   const { data, error } = await supabase
//     .from("Cabins")
//     .insert([{ ...newCabin, image: imagePath }])
//     .select();

//   if (error) {
//     console.error(error);
//     throw new Error("Cabins could not be created");
//   }

//   //upload the image

//   const { error: storageError } = await supabase.storage
//     .from("cabin-images")
//     .upload(imageName, newCabin.image);

//   ///3. Delete the cabin is there was an error
//   if (storageError) {
//     await supabase.from("Cabins").delete().eq("id", data.id);
//     console.error(storageError);
//     throw new Error("Cabin image could not be uploaded");
//   }

//   return data;
// }
