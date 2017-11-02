const box_values = [
  {
    value: "invite_to_class",
    message: "Invited to a Class"
  },
  {
    value: "texting_marketing",
    message: "Added To Texting Updates"
  },
  {
    value: "add_facebook_group",
    message: "Added to FB Group"
  },
  {
    value: "host_a_class",
    message: "Asked if willing to host a class"
  },{
    value: "emailed",
    message: "Emailed"
  }
];

const info = [
  {
    value: "first",
    label: "First Name"
  },
  {
    value: "last",
    label: "Last Name"
  },
  {
    value: "email",
    label: "Email"
  },
  {
    value: "phone",
    label: "phone"
  }
];

const lead = [
  {
    value: "cold",
    label: "Cold"
  },
  {
    value: "warm",
    label: "Warm"
  },
  {
    value: "hot",
    label: "Hot"
  }
];

const details = [
  {
    value: "know_them",
    label: "How do you know them?",
    placeholder: "I met them at Whole Foods"
  },
  {
    value: "health_needs",
    label: "Health Needs",
    placeholder: "Very anxious and sneezy"
  },
  {
    value: "family",
    label: "Family Details",
    placeholder: "They have 11 kids, two dogs and 4 cats"
  },
  {
    value: "occupation",
    label: "Occupation",
    placeholder: "Future Royal Crown Diamond"
  },
  {
    value: "recreation",
    label: "Recreational Activities",
    placeholder: "Their hobbies include swimming and sky diving on a normal basis"
  },
  {
    value: "additional_notes",
    label: "Additional Notes",
    placeholder: "Totally forgot to add a note about this..."
  },
];


const ordering_options = [
    {
      text: 'by Newest (default)',
      value: 'newest',
    },
    {
      text: 'by Oldest',
      value: 'oldest',
    },
    {
      text: 'by First',
      value: 'first',
    },
    {
      text: 'by Last',
      value: 'last',
    },
    {
      text: 'by Email',
      value: 'email',
    },
    {
      text: 'by Met Date (recent)',
      value: 'met_recent',
    },
    {
      text: 'by Met Date (old)',
      value: 'met_old',
    },
    {
      text: 'by Close Date (recent)',
      value: 'closed_recent',
    },
    {
      text: 'by Close Date (old)',
      value: 'closed_old',
    },
    {
      text: 'by Emailed Checked',
      value: 'emailed_checked',
    },
    {
      text: 'by Emailed UnChecked',
      value: 'email_unchecked',
    },

]

module.exports = {
  box_values,
  info,
  lead,
  details,
  ordering_options
};
