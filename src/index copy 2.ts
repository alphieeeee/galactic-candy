import 'bootstrap';
import {
    ViewerApp,
    AssetManagerPlugin,
    GBufferPlugin,
    ProgressivePlugin,
    TonemapPlugin,
    SSRPlugin,
    SSAOPlugin,
    BloomPlugin,
    timeout,
    DiamondPlugin,
    FrameFadePlugin,
    GLTFAnimationPlugin,
    GroundPlugin,
    TemporalAAPlugin,
    AnisotropyPlugin,
    GammaCorrectionPlugin,

    addBasePlugins,
    ITexture, TweakpaneUiPlugin, AssetManagerBasicPopupPlugin, CanvasSnipperPlugin,

    IViewerPlugin,
    AssetImporter,

    // Color, // Import THREE.js internals
    // Texture, // Import THREE.js internals
} from "webgi";
import "./sass/_index.scss";

// GSAP
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin)

async function setupViewer(){

    // Initialize the viewer
    const viewer = new ViewerApp({
        canvas: document.getElementById('webgi-canvas') as HTMLCanvasElement
    })

    // Add some plugins
    const manager = await viewer.addPlugin(AssetManagerPlugin)
    const camera = viewer.scene.activeCamera
    const position = camera.position
    const target = camera.target

    // Add a popup(in HTML) with download progress when any asset is downloading.
    await viewer.addPlugin(AssetManagerBasicPopupPlugin)

    // Add plugins individually.
    // await viewer.addPlugin(GBufferPlugin)
    // await viewer.addPlugin(new ProgressivePlugin(32))
    // await viewer.addPlugin(new TonemapPlugin(!viewer.useRgbm))
    // await viewer.addPlugin(GammaCorrectionPlugin)
    // await viewer.addPlugin(SSRPlugin)
    // await viewer.addPlugin(SSAOPlugin)
    // await viewer.addPlugin(DiamondPlugin)
    // await viewer.addPlugin(FrameFadePlugin)
    // await viewer.addPlugin(GLTFAnimationPlugin)
    // await viewer.addPlugin(GroundPlugin)
    // await viewer.addPlugin(BloomPlugin)
    // await viewer.addPlugin(TemporalAAPlugin)
    // await viewer.addPlugin(AnisotropyPlugin)

    // or use this to add all main ones at once.
    await addBasePlugins(viewer)

    // Loader
    const importer = manager.importer as AssetImporter

    importer.addEventListener('onProgress', (evt) => {
        const progressRatio = (evt.loaded / evt.total)
        gsap.to('.progress-bar1', { duration: 1, scaleX: progressRatio, transformOrigin: '0% 50%' })
        gsap.to('.progress-bar2', { duration: 1, scaleX: progressRatio, transformOrigin: '0% 50%' })
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }, 300)
    })

    importer.addEventListener('onLoad', (evt) => {
        gsap.to('.loader', { delay: 3, duration: 1, autoAlpha: 0 })
    })

    // Add more plugins not available in base, like CanvasSnipperPlugin which has helpers to download an image of the canvas.
    await viewer.addPlugin(CanvasSnipperPlugin)

    // This must be called once after all plugins are added.
    viewer.renderer.refreshPipeline()

    const cacheBuster = Math.floor(Math.random() * 1000000)
    await manager.addFromPath(`./assets/ghost.glb?cache=${ cacheBuster }`)

    // Load an environment map if not set in the glb file
    // await viewer.scene.setEnvironment(
    //     await manager.importer!.importSinglePath<ITexture>(
    //         "./assets/environment.hdr"
    //     )
    // );

    // Add some UI for tweak and testing.
    // const uiPlugin = await viewer.addPlugin(TweakpaneUiPlugin)
    // Add plugins to the UI to see their settings.
    // uiPlugin.setupPlugins<IViewerPlugin>(TonemapPlugin, CanvasSnipperPlugin)

    // camera.setCameraOptions({ fov: 50 })

    function initScrollAnimation() {
        const section1 = document.querySelector('#section1') as HTMLElement
        const section2 = document.querySelector('#section2') as HTMLElement
        const section3 = document.querySelector('#section3') as HTMLElement
        const section4 = document.querySelector('#section4') as HTMLElement
        const section5 = document.querySelector('#section5') as HTMLElement

        const smoothie = ScrollSmoother.create({
            wrapper: '#smooth-wrapper',
            content: '#smooth-content',
            smooth: 2,
            smoothTouch: true,
        })

        const ghostTL = gsap.timeline(
            { 
                onUpdate: onUpdate,
                // scrollTrigger: {
                //     trigger: '#section2',
                //     start: 'top 98%',
                //     end: 'top top',
                //     scrub: true,
                //     immediateRender: false
                // }
            })
        const ghostTL2 = gsap.timeline(
            { 
                onUpdate: onUpdate,
                // scrollTrigger: {
                //     trigger: '#section3',
                //     start: 'top 98%',
                //     end: 'top top',
                //     scrub: true,
                //     immediateRender: false
                // }
            })
        const ghostTL3 = gsap.timeline(
            { 
                onUpdate: onUpdate,
                // scrollTrigger: {
                //     trigger: '#section4',
                //     start: 'top 98%',
                //     end: 'top top',
                //     scrub: true,
                //     immediateRender: false
                // }
            })
        const ghostTL4 = gsap.timeline(
            { 
                onUpdate: onUpdate,
                // scrollTrigger: {
                //     trigger: '#section5',
                //     start: 'top 98%',
                //     end: 'top top',
                //     scrub: true,
                //     immediateRender: false
                // }
            })
        const ghostTL5 = gsap.timeline(
            { 
                onUpdate: onUpdate,
                // scrollTrigger: {
                //     trigger: '#section6',
                //     start: 'top 98%',
                //     end: 'top top',
                //     scrub: true,
                //     immediateRender: false
                // }
            })
        // const ghostTL2 = gsap.timeline({ onUpdate: onUpdate })
        // const ghostTL3 = gsap.timeline({ onUpdate: onUpdate })
        // const ghostTL4 = gsap.timeline({ onUpdate: onUpdate })
        // const ghostTL5 = gsap.timeline({ onUpdate: onUpdate })

        const anim1TL = gsap.timeline()
        const anim2TL = gsap.timeline()
        const anim3TL = gsap.timeline()
        const anim4TL = gsap.timeline()
        const anim5TL = gsap.timeline()
        ScrollTrigger.refresh()

        const ufoTL = gsap.timeline({ repeat: -1, yoyo: true })
        ufoTL
        .add('ufoAnim')
        .to('.ufo', { duration: 1, y: -20, ease: 'sine.inOut' }, 'ufoAnim')
        .to('.ufo', { duration: 1, rotation: -10, ease: 'sine.inOut' }, 'ufoAnim+=0.3')
        .add('ufoAnim2')
        .to('.ufo', { duration: 1, y: 0, ease: 'sine.inOut' }, 'ufoAnim2+=0.1')
        .to('.ufo', { duration: 1, rotation: 10, ease: 'sine.inOut' },'ufoAnim2')
        
        // SCENE 1 CAMERA

        ghostTL
        .add('camera1')
        .to(position, { x: 2.97, y: -1.74, z: 2.91 }, 'camera1')
        .to(target, { x: -0.40, y: -0.010, z: 1.02 }, 'camera1')
        const ghostST = ScrollTrigger.create({
            animation: ghostTL,
            trigger: '#section2',
            start: 'top 98%',
            end: 'top top',
            scrub: true,
            immediateRender: false
        })
        // SCENE 2 CAMERA
        ghostTL2
        .add('camera2')
        .to(position, { x: -4.58, y: -2.72, z: 9.74 }, 'camera2')
        .to(target, { x: 1.61, y: -0.95, z: 2.06 }, 'camera2')
        const ghostST2 = ScrollTrigger.create({
            animation: ghostTL2,
            trigger: '#section3',
            start: 'top 98%',
            end: 'top top',
            scrub: true,
            immediateRender: false
        })
        // SCENE 3 CAMERA
        ghostTL3
        .add('camera3')
        .to(position, { x: -0.42, y: -4.37, z: 4.07 }, 'camera3')
        .to(target, { x: 0.69, y: -0.61, z: 2.07 }, 'camera3')
        const ghostST3 = ScrollTrigger.create({
            animation: ghostTL3,
            trigger: '#section4',
            start: 'top 98%',
            end: 'top top',
            scrub: true,
            immediateRender: false
        })
        // SCENE 4 CAMERA
        ghostTL4
        .add('camera4')
        .to(position, { x: -0.72, y: 0.70, z: 6.74 }, 'camera4')
        .to(target, { x: -0.03, y: 0.02, z: 0.74 }, 'camera4')
        const ghostST4 = ScrollTrigger.create({
            animation: ghostTL4,
            trigger: '#section5',
            start: 'top 98%',
            end: 'top top',
            scrub: true,
            immediateRender: false
        })
        ghostTL5
        .add('camera5')
        .to(position, { x: 4.16, y: -0.62, z: -15.26 }, 'camera5')
        .to(target, { x: -0.24, y: -0.23, z: 0.56 }, 'camera5')
        const ghostST5 = ScrollTrigger.create({
            animation: ghostTL5,
            trigger: '#section6',
            start: 'top 98%',
            end: 'top top',
            scrub: true,
            immediateRender: false
        })
        
        // SCENE 1 ANIMATION
        anim1TL
        .set('.section2-copy', { yPercent: 100, opacity: 0 })
        .add('scene1')
        .to('.section1-copy', { opacity: 0 }, 'scene1')
        .to('.section2-copy', { yPercent: 0, opacity: 1 }, 'scene1+=1')
        ScrollTrigger.create({
            animation: anim1TL,
            trigger: '#section2',
            start: 'top 98%',
            end: 'top top',
            scrub: true,
            immediateRender: false
        })
        // SCENE 2 ANIMATION
        anim2TL
        .set(['.skull-candy','.skull-copy'], { yPercent: 100, opacity: 0 })
        .add('scene2')
        .to('.section2-copy', { opacity: 0 }, 'scene2')
        .to('.skull-candy', { yPercent: 0, opacity: 1 }, 'scene2+=0.5')
        .to('.skull-copy', { yPercent: 0, opacity: 1 }, 'scene2+=0.9')
        ScrollTrigger.create({
            animation: anim2TL,
            trigger: '#section3',
            start: 'top 98%',
            end: 'top top',
            scrub: true,
            immediateRender: false
        })
        // SCENE 3 ANIMATION
        anim3TL
        .set(['.space-cane','.cane-copy'], { yPercent: 100, opacity: 0 })
        .add('scene3')
        .to(['.skull-candy','.skull-copy'], { opacity: 0 }, 'scene3')
        .to('.space-cane', { yPercent: 0, opacity: 1 }, 'scene3+=0.5')
        .to('.cane-copy', { yPercent: 0, opacity: 1 }, 'scene3+=0.9')
        ScrollTrigger.create({
            animation: anim3TL,
            trigger: '#section4',
            start: 'top 98%',
            end: 'top top',
            scrub: true,
            immediateRender: false
        })
        // SCENE 4 ANIMATION
        anim4TL
        .set('.section5-copy', { yPercent: 100, opacity: 0 })
        .add('scene4')
        .to(['.space-cane','.cane-copy'], { opacity: 0 }, 'scene4')
        .to('.section5-copy', { yPercent: 0, opacity: 1 }, 'scene4')
        ScrollTrigger.create({
            animation: anim4TL,
            trigger: '#section5',
            start: 'top 98%',
            end: 'top top',
            scrub: true,
            immediateRender: false
        })
        // SCENE 5 ANIMATION
        anim5TL
        .set('.section6-copy', { yPercent: 100, opacity: 0 })
        .add('scene5')
        .to('.section5-copy', { opacity: 0 }, 'scene5')
        .to('.section6-copy', { yPercent: 0, opacity: 1 }, 'scene5+=0.4')
        ScrollTrigger.create({
            animation: anim5TL,
            trigger: '#section6',
            start: 'top 98%',
            end: 'top top',
            scrub: true,
            immediateRender: false
        })
    }

    initScrollAnimation()

    // WEBGI UPDATE
    let needsUpdate = true

    function onUpdate() {
        needsUpdate = true
        // viewer.renderer.resetShadows()
        // viewer.setDirty()
    }

    viewer.addEventListener('preFrame', () => {
        if (needsUpdate) {
            camera.positionUpdated(true)
            camera.targetUpdated(true)
            needsUpdate = false
        }
    })
    
    interface Star {
        x: number;
        y: number;
        radius: number;
        alpha: number;
        decreasing: boolean;
        dRatio: number;
    }
      
    const canvas = document.getElementById('stars') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    
    // Set canvas dimensions
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Create an array to store stars
    const stars: Star[] = [];
    const numStars = 100;
    
    // Generate stars and add them to the array
    for (let i = 0; i < numStars; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const radius = Math.random() * 2;
        
        stars.push({
            x: x,
            y: y,
            radius: radius,
            alpha: 1,
            decreasing: true,
            dRatio: Math.random() * 0.05,
        });
    }
    
    // Animate stars
    function animate() {
        requestAnimationFrame(animate);
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    
        // Draw stars
        for (let i = 0; i < numStars; i++) {
            const star = stars[i];
        
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
            ctx.fill();
        
            // Update star alpha
            if (star.decreasing) {
            star.alpha -= star.dRatio;
            if (star.alpha < 0.1) {
                star.decreasing = false;
            }
            } else {
            star.alpha += star.dRatio;
                if (star.alpha > 0.95) {
                    star.decreasing = true;
                }
            }
        }
    }
    
    // Star animation
    animate();
}

setupViewer()
