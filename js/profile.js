// Back button
document.getElementById("backBtn").addEventListener("click", () => {
  window.location.href = "dashboard.html";
});

// Elements
const nameInput = document.getElementById("profileName");
const bioInput = document.getElementById("profileBio");
const picInput = document.getElementById("profilePic");
const previewImg = document.getElementById("profilePreview");

// Load profile
const savedProfile = JSON.parse(localStorage.getItem("profile")) || {};
nameInput.value = savedProfile.name || "";
bioInput.value = savedProfile.bio || "";
if (savedProfile.pic) previewImg.src = savedProfile.pic;

// Load habit stats
const habits = JSON.parse(localStorage.getItem("habits")) || [];
document.getElementById("habitCount").textContent = habits.length;
document.getElementById("completedCount").textContent =
  habits.filter(h => h.completed).length;

// Save profile
document.getElementById("saveProfile").addEventListener("click", () => {
  const profileData = {
    name: nameInput.value,
    bio: bioInput.value,
    pic: previewImg.src
  };

  localStorage.setItem("profile", JSON.stringify(profileData));
  alert("Profile saved successfully ✅");
});

// Image preview
picInput.addEventListener("change", e => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    previewImg.src = reader.result;
  };
  reader.readAsDataURL(file);
});