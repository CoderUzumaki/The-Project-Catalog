export interface Testimonial {
  name: string;
  initials: string;
  image?: string; // optional in case some testimonials don't have images
  role: string;
  content: string;
  featured?: boolean; // for large video content
}

const testimonials: Testimonial[] = [
    {
        "name": "Satwik Sahu",
        "role": "Software Engineer",
        "initials": "SS",
        "image": "https://randomuser.me/api/portraits/men/1.jpg",
        "content": "DevHub completely transformed how I approach side projects. The curated challenges pushed me to learn new technologies and build things I never thought I could."
    },
    {
        "name": "Pratham Malu",
        "role": "Frontend Developer",
        "initials": "PM",
        "image": "https://randomuser.me/api/portraits/men/3.jpg",
        "content": "An essential platform for any developer looking to build a standout portfolio. The project ideas are unique and actually impressive to recruiters."
    },
    {
        "name": "Anvi Patel",
        "role": "Full Stack Developer",
        "initials": "AP",
        "image": "https://randomuser.me/api/portraits/women/1.jpg",
        "content": "I love how easy it is to find projects that match my skill level. The community showcases gave me so much inspiration for my own implementations."
    },
    {
        "name": "Jaya Desai",
        "role": "Software Engineer",
        "initials": "JD",
        "image": "https://randomuser.me/api/portraits/women/3.jpg",
        "content": "DevHub helped me land my dream job at a top tech company. The projects I built here became the centerpiece of my portfolio and interview discussions."
    },
    {
        "name": "Jayanti Jha",
        "role": "Software Engineer",
        "initials": "JJ",
        "image": "https://randomuser.me/api/portraits/women/2.jpg",
        "content": "The filtering by tech stack feature has been a game-changer for my learning journey. I can focus on projects that help me master specific technologies.",
        "featured": true
    }
]

export default testimonials;