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

const address_boxes = [
  {
    label: "Address 1",
    placeholder: "80001 w frankford ave",
    name: "address1",
    key: "address1",
  },
  {
    label: "Address 2",
    placeholder: "APT 309",
    name: "address2",
    key: "address2",
  },
  {
    label: "City",
    placeholder: "Denver",
    name: "city",
    key: "city",
  },
  {
    label: "State",
    placeholder: "Colorado",
    name: "state",
    key: "state",
  },
  {
    label: "zip",
    placeholder: "Zip",
    name: "zip",
    key: "zip",
  }
]

const details = [
  {
    key: "123know_them",
    value: "know_them",
    label: "How do you know them?",
    placeholder: "I met them at Whole Foods"
  },
  {
    key: "123health",
    value: "health_needs",
    label: "Health Needs",
    placeholder: "Very anxious and sneezy"
  },
  {
    key: "123family",
    value: "family",
    label: "Family Details",
    placeholder: "They have 11 kids, two dogs and 4 cats"
  },
  {
    key: "312occupation",
    value: "occupation",
    label: "Occupation",
    placeholder: "Future Royal Crown Diamond"
  },
  {
    key: "290837recreation",
    value: "recreation",
    label: "Recreational Activities",
    placeholder: "Their hobbies include swimming and sky diving on a normal basis"
  },
  {
    key: "019219028addtional_notes",
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
      text: 'by Close Date',
      value: 'closed_recent',
    },
    {
      text: 'by Not Closed',
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
  ordering_options,
  address_boxes
};
