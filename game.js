// 1. Calculate distance between player centers
const dx = p2.x - p1.x;
const dy = p2.y - p1.y;
const distance = Math.sqrt(dx * dx + dy * dy);

// Check if circles overlap
if (distance < p1.radius + p2.radius) {
  // 2. Find the collision normal (unit vector pointing from p1 to p2)
  const nx = dx / distance;
  const ny = dy / distance;

  // 3. Relative velocity
  const kx = p1.vx - p2.vx;
  const ky = p1.vy - p2.vy;

  // 4. Calculate relative velocity along the normal
  const relativeVelocityNormal = kx * nx + ky * ny;

  // Only resolve if they are moving toward each other
  if (relativeVelocityNormal > 0) {
    // 5. Calculate impulse scalar (e = coefficient of restitution/bounciness)
    const impulse = (1 + e) * relativeVelocityNormal / (1/p1.mass + 1/p2.mass);

    // 6. Apply the impulse to update velocities
    p1.vx -= (impulse / p1.mass) * nx;
    p1.vy -= (impulse / p1.mass) * ny;
    p2.vx += (impulse / p2.mass) * nx;
    p2.vy += (impulse / p2.mass) * ny;
  }
}
