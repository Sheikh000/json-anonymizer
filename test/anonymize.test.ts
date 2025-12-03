describe('anonymize basic', () => {
  test('masks email and phone', async () => {
    const { anonymize } = await import('../src');
    const input = {
      email: 'johndoe@example.com',
      phone: '+1 (555) 123-4567',
    };
    const cfg = {
      email: { type: 'email' },
      phone: { type: 'phone' },
    } as any;
    const out = anonymize(input, cfg) as any;
    console.log(out);
    expect(out).not.toBe(input);
    expect(out.email).toContain('@example.com');
    expect(out.phone).toMatch(/\*+/);
  });
});
