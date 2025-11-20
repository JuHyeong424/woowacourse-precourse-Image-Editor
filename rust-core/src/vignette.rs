pub fn vignette(data: &mut [u8], width: usize, height: usize, vignette: f32) {
    let s = (vignette / 100.0).clamp(-1.0, 1.0);

    if s.abs() < 1e-6 {
        return;
    }

    let cx = width as f32 / 2.0;
    let cy = height as f32 / 2.0;
    let max_dist = (cx * cx + cy * cy).sqrt();

    let idx = |x: usize, y: usize| -> usize { (y * width + x) * 4 };

    for y in 0..height {
        for x in 0..width {
            let dx = x as f32 - cx;
            let dy = y as f32 - cy;
            let dist = (dx * dx + dy * dy).sqrt() / max_dist; // 0 ~ 1

            let vignette = 1.0 + s * dist.powf(1.8);

            let i = idx(x, y);

            let r = data[i] as f32 * vignette;
            let g = data[i + 1] as f32 * vignette;
            let b = data[i + 2] as f32 * vignette;

            data[i] = r.clamp(0.0, 255.0) as u8;
            data[i + 1] = g.clamp(0.0, 255.0) as u8;
            data[i + 2] = b.clamp(0.0, 255.0) as u8;
        }
    }
}
