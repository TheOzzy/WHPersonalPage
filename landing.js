(function () {
    const roles = ["DevOps Engineer", "Systems Engineer", "Infrastructure Engineer"];
    const target = document.getElementById("role-typing");
    if (!target) return;

    let roleIndex = 0;
    let charIndex = 0;
    let typing = true;

    function tick() {
        const current = roles[roleIndex];

        if (typing) {
            charIndex++;
            target.textContent = current.slice(0, charIndex);
            if (charIndex === current.length) {
                typing = false;
                setTimeout(tick, 1200);
                return;
            }
        } else {
            charIndex--;
            target.textContent = current.slice(0, charIndex);
            if (charIndex === 0) {
                typing = true;
                roleIndex = (roleIndex + 1) % roles.length;
            }
        }
        setTimeout(tick, typing ? 120 : 60);
    }

    tick();
})();

