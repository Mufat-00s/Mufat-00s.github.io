export const projects = [
    {
        id: "p1",
        title: "Program Synthesis",
        shortDescription: "An automated program synthesis engine that generates correct-by-construction code from high-level specifications.",
        description: "Developed a program synthesis engine capable of automatically generating executable programs from formal specifications. Extended the base synthesis algorithm to improve efficiency, scalability, and synthesis capabilities, and adapted the system to generate programs for the Minecraft game environment. Used the MineRL library and machine learning algorithms to generate and execute correct sequences of actions within the game. The project provided hands-on experience with algorithm design, automated reasoning, machine learning, and collaborative software development.",
        repo: "",
        img: "content/minerl.jpg",
        skills: ["julia", "algorithms", "program-synthesis", "automated-reasoning", "machine-learning"],
        colour: "blue"
    },
    {
        id: "p2",
        title: "Ray Tracer, Rasterizer & Physics Simulator",
        shortDescription: "A custom graphics engine featuring ray tracing, rasterization, and GPU-accelerated physics simulation.",
        description: "Built a graphics engine from scratch using OpenGL, implementing a recursive ray tracer, real-time rasterizer, and GPU-based physics simulator. Added advanced rendering techniques including texture mapping, glossy reflections, transparency, bloom, environment mapping, mipmapping, and bilinear interpolation. Optimized rendering performance using a Bounding Volume Hierarchy (BVH), gaining extensive experience in computer graphics, rendering algorithms, and GPU programming.",
        repo: "",
        img: "content/graphics.jpg",
        skills: ["c++", "opengl", "computer-graphics", "gpu", "algorithms"],
        colour: "red"
    },
    {
        id: "p3",
        title: "Microservice Kahoot-Style Game",
        shortDescription: "A scalable multiplayer quiz platform built using a microservices architecture.",
        description: "Collaborated on the design and implementation of a Kahoot-style quiz application using Java and Spring Boot. Developed independent backend services, implemented inter-service communication, and managed project dependencies using Gradle. The project focused on distributed systems, scalability, and clean service-oriented architecture.",
        repo: "",
        img: "",
        skills: ["java", "spring", "microservices", "gradle", "distributed-systems"],
        colour: "green"
    },
    {
        id: "p4",
        title: "Event-Driven Parking Sensor Data Manager",
        shortDescription: "A real-time event-driven backend for processing parking sensor data.",
        description: "Developed an event-driven system where parking sensors publish updates over MQTT to a central processing service. Implemented asynchronous communication using WebSockets to stream live data to connected clients. The project explored message-driven architectures, real-time systems, and scalable event processing.",
        repo: "",
        img: "",
        skills: ["java", "mqtt", "websockets", "event-driven", "distributed-systems"],
        colour: "purple"
    },
    {
        id: "p5",
        title: "Autonomous Robot Navigation",
        shortDescription: "An embedded robot capable of autonomous navigation using onboard sensors.",
        description: "Designed and programmed a small autonomous robot that navigates predefined trajectories using infrared and ultrasonic sensors. Developed firmware in C and Rust for microcontroller-based control, implemented sensor interfacing and control logic, and gained practical experience with embedded debugging, I/O interfacing, and real-time control systems.",
        repo: "",
        img: "",
        skills: ["c", "rust", "embedded", "microcontrollers", "control-systems", "robotics"],
        colour: "orange"
    },
    {
        id: "p6",
        title: "Drone Control System & Communication",
        shortDescription: "A real-time embedded flight controller with custom wireless communication.",
        description: "Built an embedded drone control system featuring a custom communication protocol over Bluetooth for reliable controller-to-drone communication. Implemented flight stabilization, control loops, sensor fusion, and orientation filtering while integrating onboard sensors. Optimized the system for deterministic real-time performance through extensive debugging and embedded software optimization.",
        repo: "",
        img: "content/drone.png",
        skills: ["c", "embedded", "bluetooth", "control-systems", "sensor-fusion", "real-time"],
        colour: "cyan"
    },
    {
        id: "p7",
        title: "AI SSH Honeypot",
        shortDescription: "An AI-powered SSH honeypot that provides realistic interactive attacker environments.",
        description: "Developed an advanced SSH honeypot that deploys isolated Docker containers to emulate real systems while safely capturing attacker behavior. Integrated an LLM to generate realistic, context-aware shell responses instead of static outputs, creating a convincing interactive environment. Implemented persistent session state, comprehensive telemetry collection, and filesystem persistence to allow returning attackers to continue previous sessions, enabling long-term threat intelligence and deception research.",
        repo: "",
        img: "content/honeypot.jpg",
        skills: ["python", "docker", "cybersecurity", "ai", "llm", "ssh", "honeypot"],
        colour: "black"
    }
]