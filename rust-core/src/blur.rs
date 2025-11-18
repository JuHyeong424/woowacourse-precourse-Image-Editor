pub fn blur(data: &mut [u8], width: usize, height: usize) {
    let kernel: [f32; 9] = [
        1.0, 2.0, 1.0,
        2.0, 4.0, 2.0,
        1.0, 2.0, 1.0,
    ];
    let kernel_sum = 16.0;

    let mut temp = data.to_vec();

    for y in 1..height-1 {
        for x in 1..width-1 {
            let mut r = 0.0;
            let mut g = 0.0;
            let mut b = 0.0;

            let idx = |x: usize, y: usize| -> usize { (y * width + x) * 4 };

            let mut k = 0;

            for ky in 0..3 {
                for kx in 0..3 {
                    let px = x + kx - 1;
                    let py = y + ky - 1;
                    let i = idx(px, py);

                    r += temp[i]     as f32 * kernel[k];
                    g += temp[i + 1] as f32 * kernel[k];
                    b += temp[i + 2] as f32 * kernel[k];

                    k += 1;
                }
            }

            let i = idx(x, y);
            data[i]     = (r / kernel_sum).min(255.0) as u8;
            data[i + 1] = (g / kernel_sum).min(255.0) as u8;
            data[i + 2] = (b / kernel_sum).min(255.0) as u8;
        }
    }
}
