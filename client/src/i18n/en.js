const translations = {
    navbar: {
        logo: "Logo Text",
        Name: "Gaon Connect",
        home: "Home",
        ReportIssue: "Report Issue",
        ServiceProviders: "Service Providers",
        ComplaintTracker: "Complaint Tracker",
        communityUpdates: "Community Updates",
        profile: "Profile",
        EN: "EN",
        Login: "Login",
        SignUp: "Sign Up",
        logout: "Logout"
    },

    homePage:{
        welcome: "Welcome",
        msg: "to Gaon Connect",
        description: "Empowering rural communities through technology. Report issues, find services, and track progress in real-time.",
        whyChoose: "Why Choose Gaon Connect?",
        whyChooseDesc: "A comprehensive platform designed specifically for rural community needs",
        successStories: "Success Stories from Our Community",
        successStoriesDesc: "Real stories from villagers who have experienced the impact of Gaon Connect"
    },

    reportPage: {
        title: "Report an Urgent Issue",
        heading: "Help your community. Your report reaches nearby volunteers & authorities.",
        name: "Your Name",
        nameValue: "Enter your name",
        location: "Location of the Issue",
        locationValue: "Area / Landmark (e.g. Near Post Office)",
        phone: "Contact Number (Optional)",
        phoneValue: "Enter your phone number",
        issue: "Select Issue Type",
        issueValue: {
            choose: "Choose an option",
            accident: "🚑 Accident",
            fire: "🔥 Fire",
            staryDogAttack: "🐕 Stray Dog Attack",
            medicalEmergency: "🏥 Medical Emergency",
            unsafeRoad: "🛣 Unsafe Road Condition",
            darkRoad: "🌑 Dark Road",
            other: "⚠ Other"
        },
        desc: "Describe the Situation",
        descValue: "Explain what happened... (e.g. bike accident on main road)",
        submit: "Submit Report",
        footer: "Your location is used only to send help faster."
    },

    providers: {
        title: "Local Service Providers",
        heading: "Find trusted workers near you — electricians, plumbers, carpenters & more.",
        carouselText: "Register as a Service Provider",
        name: "Your Name",
        nameValue: "Enter you Name",
        phone: "Contact Number (Optional)",
        phoneValue: "Enter your phone number",
        service: "Select Issue Type",
        serviceValue: {
            choose: "Choose an option",
            plumber: "🚰 Plumber",
            electrician: "⚡ Electrician",
            carpenter: "🛠 Carpenter",
            driver: "🚗 Driver",
            painter: "🎨 Painter",
            mechanic: "🔧 Mechanic",
        },
        profession: "Available Profession",
        experience: "Describe the Situation",
        experienceValue: "Experience (eg., 5 years)",
        files: "Choose File No File Chosen",
        submit: "Submit Registration",
        listTitle: "Available Professionals",
        noProviders: "No service providers in your location yet."
    },
    ComplaintTracker: {
        title: "Civic Complaints & Tracking",
        heading: "Live map, heatmap & transparent issue tracking.",
        abcd: "Issue Heatmap",
        reportID: "Track complaint by Report ID",
        reportIDValue: "Enter Report ID",
        button: "Track",
        search: "Search by ID / name / phone / location / issue",
        status: {
            all: "All Status",
            revieved: "Received",
            assigned: "Assigned",
            inProgress: "In Progress",
            resolved: "Resolved",
            reopened: "Reopened",
        },
        complaint: "Recent Complaint",
        footer: "No complains yet."
    }
}

export default translations;