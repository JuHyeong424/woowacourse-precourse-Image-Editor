pub fn clarity(data: &mut [u8], width: usize, height: usize, clarity: f32) {
    let strength = (clarity / 100.0).clamp(-1.0, 1.0);

    if strength.abs() < 1e-6 {
        return;
    }

    let mut blurred = data.to_vec();

    let kernel: [f32; 9] = [
        1.0, 2.0, 1.0,
        2.0, 4.0, 2.0,
        1.0, 2.0, 1.0,
    ];
    let kernel_sum = 16.0;

    let idx = |x: usize, y: usize| -> usize { (y * width + x) * 4 };

    for y in 1..height - 1 {
        for x in 1..width - 1 {
            let mut r = 0.0;
            let mut g = 0.0;
            let mut b = 0.0;

            let mut k = 0;

            for ky in 0..3 {
                for kx in 0..3 {
                    let px = x + kx - 1;
                    let py = y + ky - 1;
                    let i = idx(px, py);

                    r += data[i] as f32 * kernel[k];
                    g += data[i + 1] as f32 * kernel[k];
                    b += data[i + 2] as f32 * kernel[k];

                    k += 1;
                }
            }

            let i = idx(x, y);
            blurred[i] = (r / kernel_sum).clamp(0.0, 255.0) as u8;
            blurred[i + 1] = (g / kernel_sum).clamp(0.0, 255.0) as u8;
            blurred[i + 2] = (b / kernel_sum).clamp(0.0, 255.0) as u8;
        }
    }

    for y in 0..height {
        for x in 0..width {
            let i = idx(x, y);

            let or = data[i]     as f32;
            let og = data[i + 1] as f32;
            let ob = data[i + 2] as f32;

            let br = blurred[i]     as f32;
            let bg = blurred[i + 1] as f32;
            let bb = blurred[i + 2] as f32;

            let nr = or + (or - br) * strength;
            let ng = og + (og - bg) * strength;
            let nb = ob + (ob - bb) * strength;

            data[i] = nr.clamp(0.0, 255.0) as u8;
            data[i + 1] = ng.clamp(0.0, 255.0) as u8;
            data[i + 2] = nb.clamp(0.0, 255.0) as u8;
        }
    }
}
