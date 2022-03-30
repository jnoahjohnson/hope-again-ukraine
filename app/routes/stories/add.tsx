import { useState } from "react";
import { ActionFunction, Form, redirect, useTransition } from "remix";
import MaxWidthContainer from "~/components/layout/MaxWidthContainer";
import { prisma } from "~/db.server";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  // Get variables from form data - firstName, lastName, hometown, profession, imageUrl, storyQuestionOne, storyQuestionTwo
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const hometown = formData.get("hometown");
  const profession = formData.get("profession");
  const imageUrl = formData.get("imageUrl");
  const storyQuestionOne = formData.get("storyQuestionOne");
  const storyQuestionTwo = formData.get("storyQuestionTwo");

  // Check type of variables to see if they are string
  if (
    typeof firstName !== "string" ||
    typeof lastName !== "string" ||
    typeof hometown !== "string" ||
    typeof profession !== "string" ||
    typeof imageUrl !== "string" ||
    typeof storyQuestionOne !== "string" ||
    typeof storyQuestionTwo !== "string"
  ) {
    throw new Error("Invalid form data");
  }

  // Create new story
  const newStory = await prisma.story.create({
    data: {
      firstName,
      lastName,
      hometown,
      profession,
      imageUrl,
      questionOne: storyQuestionOne,
      questionTwo: storyQuestionTwo,
      approved: true,
    },
  });

  return redirect(`/stories/${newStory.id}`);
};

type LoadingState = {
  loading: boolean;
  error: Error | null;
  completed: boolean;
};

export default function AddStory() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageState, setImageState] = useState<LoadingState>({
    loading: false,
    error: null,
    completed: false,
  });
  const transition = useTransition();

  const toBase64 = (file: File) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const uploadImage = async (inputImage: File) => {
    let timestamp = Date.now().toString();
    let upload_preset = "ukraine";

    let { signature } = await fetch("/upload/getKey", {
      headers: {
        timestamp,
        upload_preset,
      },
    })
      .then((res) => {
        return res.text();
      })
      .then((text) => {
        return JSON.parse(text);
      })
      .catch((e) => {
        throw Error("Could not generate string");
      });

    console.log(signature);

    const url = `https://api.cloudinary.com/v1_1/pineapple-solutions/image/upload`;

    if (!inputImage) {
      return;
    }

    const image = await toBase64(inputImage);

    let response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        file: image,
        timestamp,
        api_key: "291144276869338",
        signature,
        upload_preset,
      }),
    })
      .then((res) => {
        console.log(res);
        return res.text();
      })
      .then((res) => {
        console.log(res);
        return JSON.parse(res);
      });

    setImageUrl(response.secure_url);
    setImageState({ loading: false, error: null, completed: true });
  };

  return (
    <main>
      <div className="relative h-64 w-full p-4">
        <img
          src="https://images.unsplash.com/photo-1566233590969-d77010fc90f7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80"
          alt="Ukrainian home"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 h-full w-full bg-black opacity-50" />
        <MaxWidthContainer classes="py-0 flex items-end w-full h-full">
          <h1 className="relative text-5xl font-bold text-white">
            Share Your Story
          </h1>
        </MaxWidthContainer>
      </div>

      <article className="mx-auto min-h-full max-w-4xl py-24">
        <Form
          className="relative rounded bg-slate-100 p-8 shadow"
          method="post"
        >
          <div className="relative mb-4">
            <h2 className="mb-4 text-3xl font-medium text-gray-800">
              Tell us about yourself
            </h2>
            <div className="flex flex-col gap-12 md:flex-row">
              <div>
                <label>
                  <p className="mb-1 text-2xl">First Name</p>
                  <input
                    type="text"
                    name="firstName"
                    className="mb-4 rounded px-2 py-1 text-2xl shadow focus:bg-slate-50 focus:shadow-lg"
                  />
                </label>
                <label>
                  <p className="mb-1 text-2xl">Last Name</p>
                  <input
                    type="text"
                    name="lastName"
                    className="mb-4 rounded px-2 py-1 text-2xl shadow focus:bg-slate-50 focus:shadow-lg"
                  />
                </label>
                <label>
                  <p className="mb-1 text-2xl">Hometown</p>
                  <input
                    type="text"
                    name="hometown"
                    className="mb-4 rounded px-2 py-1 text-2xl shadow focus:bg-slate-50 focus:shadow-lg"
                  />
                </label>
                <label>
                  <p className="mb-1 text-2xl">Profession/Hobbies</p>
                  <input
                    type="text"
                    name="profession"
                    className="mb-4 rounded px-2 py-1 text-2xl shadow focus:bg-slate-50 focus:shadow-lg"
                  />
                </label>
              </div>
              <div className="flex h-fit w-full flex-col items-start">
                {imageUrl ? (
                  <input type="hidden" name="imageUrl" value={imageUrl} />
                ) : null}
                <div className="relative mb-2 flex h-52 w-full items-center justify-center overflow-hidden rounded bg-gray-400">
                  {imageState.loading ? (
                    <p>Uploading... </p>
                  ) : (
                    <p>Upload an Image</p>
                  )}
                  {imageUrl && (
                    <img
                      src={imageUrl}
                      alt="User upload"
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  )}
                </div>
                {!imageState.loading && !imageState.completed && (
                  <input
                    type="file"
                    name="image"
                    onChange={(e) => {
                      setImageState((prev) => ({ ...prev, loading: true }));
                      if (e.target.files) {
                        uploadImage(e.target.files[0]);
                      }
                    }}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="pb-12">
            <h2 className="mb-4 text-3xl font-medium text-gray-800">
              Tell your story
            </h2>
            <div>
              <label>
                <p className="mb-1 text-2xl">What do you love about Ukraine?</p>
                <textarea
                  name="storyQuestionOne"
                  className="mb-4 h-96 w-full rounded px-2 py-1 text-2xl shadow focus:bg-slate-50 focus:shadow-lg"
                />
              </label>
              <label>
                <p className="mb-1 text-2xl">
                  How have you been impacted by the Russian Invasion?
                </p>
                <textarea
                  name="storyQuestionTwo"
                  className="mb-4 h-96 w-full rounded px-2 py-1 text-2xl shadow focus:bg-slate-50 focus:shadow-lg"
                />
              </label>
            </div>
          </div>
          <button
            type="submit"
            disabled={transition.state === "loading"}
            className="absolute right-8 bottom-8 rounded bg-primary-blue px-4 py-1 text-xl text-white disabled:bg-gray-700"
          >
            {transition.state === "loading" ? "Submitting..." : "Submit Story"}
          </button>
        </Form>
      </article>
    </main>
  );
}
