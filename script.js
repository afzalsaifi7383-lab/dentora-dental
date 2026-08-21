/* =========================================================
   DENTORA 3D TOOTH - FIXED VERSION
   ========================================================= */

const canvas = document.getElementById("tooth-canvas");

if (canvas && typeof THREE !== "undefined") {

    /* =========================
       SCENE
    ========================= */

    const scene = new THREE.Scene();


    /* =========================
       CAMERA
    ========================= */

    const camera = new THREE.PerspectiveCamera(
        40,
        1,
        0.1,
        100
    );

    camera.position.set(0, 0, 7);


    /* =========================
       RENDERER
    ========================= */

    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true
    });

    renderer.setPixelRatio(
        Math.min(window.devicePixelRatio, 2)
    );

    renderer.setClearColor(0x000000, 0);


    /* =========================
       LIGHTS
    ========================= */

    const ambientLight = new THREE.AmbientLight(
        0xffffff,
        2.5
    );

    scene.add(ambientLight);


    const keyLight = new THREE.DirectionalLight(
        0xffffff,
        4
    );

    keyLight.position.set(3, 5, 6);

    scene.add(keyLight);


    const tealLight = new THREE.PointLight(
        0x62d6c5,
        8,
        15
    );

    tealLight.position.set(
        -3,
        2,
        5
    );

    scene.add(tealLight);


    /* =========================
       TOOTH GROUP
    ========================= */

    const toothGroup = new THREE.Group();

    scene.add(toothGroup);


    /* =========================
       TOOTH MATERIAL
    ========================= */

    const toothMaterial =
        new THREE.MeshStandardMaterial({
            color: 0xffffff,
            roughness: 0.25,
            metalness: 0.05
        });


    /* =========================
       CROWN
    ========================= */

    const crownGeometry =
        new THREE.SphereGeometry(
            1.35,
            64,
            64
        );

    const crown =
        new THREE.Mesh(
            crownGeometry,
            toothMaterial
        );

    crown.scale.set(
        0.85,
        1.0,
        0.8
    );

    crown.position.y = 0.55;

    toothGroup.add(crown);


    /* =========================
       ROOT
    ========================= */

    const rootGeometry =
        new THREE.ConeGeometry(
            0.55,
            1.8,
            48
        );

    const root =
        new THREE.Mesh(
            rootGeometry,
            toothMaterial
        );

    root.scale.set(
        0.75,
        1,
        0.75
    );

    root.position.y = -0.75;

    toothGroup.add(root);


    /* =========================
       TOOTH GROOVE
    ========================= */

    const grooveMaterial =
        new THREE.MeshStandardMaterial({
            color: 0xcfcfc8,
            roughness: 0.4
        });

    const grooveGeometry =
        new THREE.TorusGeometry(
            0.75,
            0.035,
            16,
            64
        );

    const groove =
        new THREE.Mesh(
            grooveGeometry,
            grooveMaterial
        );

    groove.rotation.x =
        Math.PI / 2;

    groove.position.y = 0.55;

    toothGroup.add(groove);


    /* =========================
       GLOW
    ========================= */

    const glowGeometry =
        new THREE.SphereGeometry(
            1.8,
            32,
            32
        );

    const glowMaterial =
        new THREE.MeshBasicMaterial({
            color: 0x62d6c5,
            transparent: true,
            opacity: 0.10,
            depthWrite: false
        });

    const glow =
        new THREE.Mesh(
            glowGeometry,
            glowMaterial
        );

    glow.scale.set(
        1.1,
        1.1,
        1.1
    );

    toothGroup.add(glow);


    /* =========================
       POSITION
    ========================= */

    toothGroup.position.set(
        0,
        0,
        0
    );


    /* =========================
       RESIZE
    ========================= */

    function resize() {

        const width =
            canvas.clientWidth || 500;

        const height =
            canvas.clientHeight || 500;

        camera.aspect =
            width / height;

        camera.updateProjectionMatrix();

        renderer.setSize(
            width,
            height,
            false
        );
    }

    resize();

    window.addEventListener(
        "resize",
        resize
    );


    /* =========================
       MOUSE
    ========================= */

    let targetX = 0;
    let targetY = 0;

    window.addEventListener(
        "mousemove",
        (event) => {

            targetY =
                (event.clientX /
                    window.innerWidth - 0.5) *
                0.8;

            targetX =
                (event.clientY /
                    window.innerHeight - 0.5) *
                0.3;
        }
    );


    /* =========================
       ANIMATION
    ========================= */

    const clock =
        new THREE.Clock();

    function animate() {

        requestAnimationFrame(
            animate
        );

        const time =
            clock.getElapsedTime();


        /* Automatic rotation */

        toothGroup.rotation.y += 0.005;


        /* Mouse movement */

        toothGroup.rotation.x +=
            (
                targetX -
                toothGroup.rotation.x
            ) * 0.04;


        /* Floating */

        toothGroup.position.y =
            Math.sin(time * 1.2) * 0.08;


        /* Glow */

        const glowSize =
            1.08 +
            Math.sin(time * 1.5) * 0.04;

        glow.scale.set(
            glowSize,
            glowSize,
            glowSize
        );


        renderer.render(
            scene,
            camera
        );
    }


    animate();

}
