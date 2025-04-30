router.post("/signup", async (req, res) => {
  const { name, email, password, role, extraFields } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const userData = {
      name,
      email,
      password: hashedPassword,
      role,
    };

   
    if (role === "worker" && extraFields.skills) {
      userData.skills = extraFields.skills.map((s) => s.value);
    }
    if ((role === "user" || role === "employer") && extraFields.company) {
      userData.company = extraFields.company;
    }

    const newUser = await User.create(userData);

    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      skills: newUser.skills,
      company: newUser.company,
    });
  } catch (err) {
    res.status(500).json({ message: "Signup failed", error: err.message });
  }
});
