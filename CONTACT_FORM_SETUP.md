# Contact Form Setup Guide

## 🚀 Your contact form is now ready to work! 

The form has been implemented with multiple submission methods for maximum reliability.

## 📋 Setup Options

### Option 1: Formspree (Recommended - Free & Easy)

1. **Sign up for Formspree**: Go to [formspree.io](https://formspree.io) and create a free account
2. **Create a new form** in your Formspree dashboard
3. **Copy your Form ID** (looks like `xvojpkmq` or similar)
4. **Update the form action** in `content/contact/content.html` line 199:
   ```html
   <!-- Change this line: -->
   <form id="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   
   <!-- To this (replace YOUR_FORM_ID with your actual ID): -->
   <form id="contact-form" action="https://formspree.io/f/xvojpkmq" method="POST">
   ```

**That's it!** Your form will now send emails directly to your inbox.

### Option 2: Netlify Forms (If hosting on Netlify)

1. **Add netlify attribute** to the form tag:
   ```html
   <form id="contact-form" netlify name="contact" method="POST">
   ```
2. **Deploy to Netlify** - Forms automatically work with no additional setup!

### Option 3: Keep as Mailto Fallback (No setup required)

If you don't set up Formspree or Netlify, the form will automatically fallback to opening the user's email client with a pre-filled message.

## ✨ Form Features

### ✅ What Works Right Now:
- **Client-side validation** with real-time error messages
- **Loading states** with disabled button during submission
- **Multiple submission methods** with automatic fallback
- **Success/error status messages** with visual feedback
- **Mobile responsive** design
- **Accessibility compliant** with proper labels and error handling
- **Spam protection** through Formspree (when configured)

### 🔒 Built-in Validation:
- **Name**: 2-50 characters, letters and spaces only
- **Email**: Valid email format required
- **Message**: 10-1000 characters required
- **Real-time feedback** on field blur
- **Form won't submit** until all validation passes

### 🎨 Visual States:
- **Loading button** shows "Sending..." when submitting
- **Success message** in green with checkmark
- **Error messages** in red with clear instructions
- **Disabled states** prevent double-submission

## 🔧 Testing the Form

### Before Setup (Mailto Mode):
1. Fill out the form and click "Send Message"
2. Your email client should open with the message pre-filled
3. Send the email manually

### After Formspree Setup:
1. Fill out the form and click "Send Message"
2. You should see "Message sent successfully!"
3. Check your email inbox for the message
4. Check your spam folder if nothing appears

## 🛠 Customization Options

### Change Email Address:
Update line 399 in the contact form:
```javascript
const mailtoLink = `mailto:mitchell@mvwengineering.org?subject=${subject}&body=${body}`;
```

### Modify Validation Rules:
Edit the validation object starting at line 293:
```javascript
const validation = {
    name: {
        pattern: /^[a-zA-Z\s]{2,50}$/,
        message: 'Name must be 2-50 characters long and contain only letters and spaces.'
    },
    // ... etc
};
```

### Add New Fields:
1. Add HTML form field
2. Add validation rule
3. Update the data object in submission handler

## 🚨 Troubleshooting

### Form Not Working?
1. **Check console** for JavaScript errors
2. **Verify Formspree ID** is correct
3. **Test with mailto fallback** by using an invalid Formspree ID
4. **Check network tab** to see if requests are being made

### Emails Not Coming Through?
1. **Check spam folder**
2. **Verify email address** in Formspree dashboard
3. **Check Formspree submission logs**
4. **Test with a different email address**

### Validation Issues?
1. **Check field requirements** match validation patterns
2. **Test each field individually**
3. **Look for error messages** in red text

## 🎯 Next Steps

1. **Set up Formspree** for best user experience
2. **Test thoroughly** on different devices/browsers
3. **Monitor submissions** through Formspree dashboard
4. **Consider adding honeypot** field for additional spam protection
5. **Add Google reCAPTCHA** if spam becomes an issue

## 💡 Pro Tips

- **Formspree free tier**: 50 submissions/month
- **Upgrade if needed**: $10/month for unlimited submissions
- **Keep mailto fallback**: Always works even if Formspree is down
- **Test regularly**: Check form functionality after any updates
- **Monitor bounce rate**: Ensure your email can receive messages

---

**Your contact form is production-ready!** Choose your preferred setup method and start receiving messages from visitors.