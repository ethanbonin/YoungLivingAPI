const devNotes = [
  {
    "11/04/2017": {
      bug_fixes: [""],
      new_features: ["Added a Search bar to the prospect page! You can now quickly search through ALL your people on the prospect page."],
      updated_features: [
        "You will now be rerouted if you log in. It will bring you to the dashboard. Similary, it will give you a 404 not found if you try routing to a page that doesn't exist"
      ]
    },
    "10/31/2017": {
      bug_fixes: [
        "Fixed a bug where the prospect page flashed whenever you loaded it.",
        "Fixed a bug when you deleted a prospect, the whole prospect page would disappear.",
        "Fixed a bug when you added a new prospect, it would make the list disapper."
      ],
      new_features: [
        "Added a numbering system to your list so you can see how many prospects you have.",
        "You can now update the checkmarks from the master page. You do not have to open each person change the checkmarks.",
        "Added a button to allow you to email all your new prospects or just email those who you have not emailed yet."
      ],
      updated_features: [
        "The prospect page should be loading a lot faster now. You should see limited lag when viewing cards",
        "I moved the add button and email button to the top of the page so that you can easily reach it when your list gets big.",
        "Sorted the list by who was added last. They will appear the top of the list now."
      ]
    }
  }
];

const convert_to_normal = {
  bug_fixes: "Bug Fixes",
  new_features: "New Features",
  updated_features: "Updated Features"
};

module.exports = {
  devNotes,
  convert_to_normal
};
