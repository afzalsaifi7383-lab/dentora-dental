/* =========================================================
   DENTORA 3D DENTAL WEBSITE
   ========================================================= */


/* =========================================================
   1. SCROLL REVEAL
   ========================================================= */

const revealElements = document.querySelectorAll(
    ".hero-content, .hero-visual, .section, .card, .doctor-section, .appointment"
);

const revealObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

        });

    },
    {
        threshold: 0.12
    }
);


revealElements.forEach((element) => {

    element.classList.add("reveal");

    revealObserver.observe(element);

});


/* =========================================================
   2. THREE.JS 3D TOOTH
   ========================================================= */

const canvas = document.getElementById("tooth-canvas");


if (canvas && typeof THREE !== "undefined") {


    /* -----------------------------------------------------
       SCENE
       ----------------------------------------------------- */

    const scene = new THREE.Scene();


    /* -----------------------------------------------------
       CAMERA
       ----------------------------------------------------- */

    const camera = new THREE.PerspectiveCamera(
        35,
        canvas.clientWidth / canvas.clientHeight,
        0.1,
        100
    );

    camera.position.set(
        0,
        0,
        6
    );


    /* -----------------------------------------------------
       RENDERER
       ----------------------------------------------------- */

    const renderer = new THREE.WebGLRenderer({

        canvas: canvas,

        alpha: true,

        antialias: true,

        powerPreference: "high-performance"

    });


    renderer.setPixelRatio(
        Math.min(window.devicePixelRatio, 2)
    );


    renderer.setSize(
        canvas.clientWidth,
        canvas.clientHeight,
        false
    );


    renderer.outputColorSpace =
        THREE.SRGBColorSpace;


    /* -----------------------------------------------------
       LIGHTING
       ----------------------------------------------------- */

    const ambientLight =
        new THREE.AmbientLight(
            0xffffff,
            2
        );


    scene.add(
        ambientLight
    );


    const mainLight =
        new THREE.DirectionalLight(
            0xffffff,
            4
        );


    mainLight.position.set(
        3,
        4,
        5
    );


    scene.add(
        mainLight
    );


    const tealLight =
        new THREE.PointLight(
            0x62d6c5,
            15,
            12
        );


    tealLight.position.set(
        -3,
        1,
        4
    );


    scene.add(
        tealLight
    );


    /* =====================================================
       TOOTH GROUP
       ===================================================== */

    const toothGroup =
        new THREE.Group();


    scene.add(
        toothGroup
    );


    /* =====================================================
       TOOTH CROWN
       ===================================================== */

    const crownGeometry =
        new THREE.SphereGeometry(
            1.25,
            64,
            64
        );


    const toothMaterial =
        new THREE.MeshPhysicalMaterial({

            color: 0xf8f8f2,

            roughness: 0.22,

            metalness: 0.02,

            transmission: 0.05,

            thickness: 0.4,

            clearcoat: 0.7,

            clearcoatRoughness: 0.15

        });


    const crown =
        new THREE.Mesh(
            crownGeometry,
            toothMaterial
        );


    crown.scale.set(
        0.88,
        1.12,
        0.78
    );


    crown.position.y =
        0.45;


    toothGroup.add(
        crown
    );


    /* =====================================================
       TOOTH ROOT
       ===================================================== */

    const rootGeometry =
        new THREE.ConeGeometry(
            0.58,
            1.65,
            48
        );


    const root =
        new THREE.Mesh(
            rootGeometry,
            toothMaterial
        );


    root.scale.set(
        0.8,
        1,
        0.8
    );


    root.position.y =
        -0.85;


    toothGroup.add(
        root
    );


    /* =====================================================
       TOOTH DETAILS
       ===================================================== */

    const grooveMaterial =
        new THREE.MeshStandardMaterial({

            color: 0xd8d8ce,

            roughness: 0.45

        });


    const grooveGeometry =
        new THREE.TorusGeometry(
            0.58,
            0.025,
            12,
            64
        );


    const groove =
        new THREE.Mesh(
            grooveGeometry,
            grooveMaterial
        );


    groove.rotation.x =
        Math.PI / 2;


    groove.position.y =
        0.72;


    groove.scale.set(
        1.2,
        1,
        0.85
    );


    toothGroup.add(
        groove
    );


    /* =====================================================
       INNER GLOW
       ===================================================== */

    const glowGeometry =
        new THREE.SphereGeometry(
            1.55,
            32,
            32
        );


    const glowMaterial =
        new THREE.MeshBasicMaterial({

            color: 0x62d6c5,

            transparent: true,

            opacity: 0.08

        });


    const glow =
        new THREE.Mesh(
            glowGeometry,
            glowMaterial
        );


    toothGroup.add(
        glow
    );


    /* =====================================================
       MOUSE MOVEMENT
       ===================================================== */

    let targetRotationX = 0;

    let targetRotationY = 0;


    window.addEventListener(
        "mousemove",
        (event) => {

            const x =
                (event.clientX /
                    window.innerWidth) *
                2 - 1;


            const y =
                (event.clientY /
                    window.innerHeight) *
                2 - 1;


            targetRotationY =
                x * 0.45;


            targetRotationX =
                y * 0.2;

        }
    );


    /* =====================================================
       TOUCH SUPPORT
       ===================================================== */

    window.addEventListener(
        "touchmove",
        (event) => {

            if (!event.touches.length) {
                return;
            }


            const touch =
                event.touches[0];


            const x =
                (touch.clientX /
                    window.innerWidth) *
                2 - 1;


            const y =
                (touch.clientY /
                    window.innerHeight) *
                2 - 1;


            targetRotationY =
                x * 0.3;


            targetRotationX =
                y * 0.15;

        },
        {
            passive: true
        }
    );


    /* =====================================================
       RESIZE
       ===================================================== */

    function resizeRenderer() {

        const width =
            canvas.clientWidth;


        const height =
            canvas.clientHeight;


        if (
            width === 0 ||
            height === 0
        ) {

            return;

        }


        camera.aspect =
            width / height;


        camera.updateProjectionMatrix();


        renderer.setSize(
            width,
            height,
            false
        );

    }


    window.addEventListener(
        "resize",
        resizeRenderer
    );


    resizeRenderer();


    /* =====================================================
       ANIMATION LOOP
       ===================================================== */

    const clock =
        new THREE.Clock();


    function animate() {

        requestAnimationFrame(
            animate
        );


        const elapsed =
            clock.getElapsedTime();


        /* Automatic rotation */

        toothGroup.rotation.y +=
            0.004;


        /* Smooth mouse movement */

        toothGroup.rotation.x +=
            (
                targetRotationX -
                toothGroup.rotation.x
            ) * 0.04;


        /* Keep automatic rotation
           while responding to mouse */

        toothGroup.rotation.y +=
            (
                targetRotationY -
                toothGroup.rotation.y
            ) * 0.008;


        /* Floating motion */

        toothGroup.position.y =
            Math.sin(elapsed * 1.2) *
            0.08;


        /* Glow breathing */

        const glowScale =
            1 +
            Math.sin(elapsed * 1.5) *
            0.04;


        glow.scale.set(
            glowScale,
            glowScale,
            glowScale
        );


        renderer.render(
            scene,
            camera
        );

    }


    animate();

}


/* =========================================================
   3. SMOOTH NAVIGATION
   ========================================================= */

document
    .querySelectorAll(
        'a[href^="#"]'
    )
    .forEach((link) => {

        link.addEventListener(
            "click",
            (event) => {

                const targetId =
                    link.getAttribute("href");


                const target =
                    document.querySelector(
                        targetId
                    );


                if (!target) {
                    return;
                }


                event.preventDefault();


                target.scrollIntoView({
                    behavior: "smooth"
                });

            }
        );

    });
