package io.curity.oauthagent

import io.curity.oauthagent.exception.UnauthorizedException
import org.springframework.http.server.reactive.ServerHttpRequest
import org.springframework.stereotype.Service

@Service
class RequestValidator(
    private val cookieEncrypter: CookieEncrypter,
    private val config: OAuthAgentConfiguration,
    private val cookieName: CookieName
)
{
    suspend fun validateServletRequest(request: ServerHttpRequest, options: ValidateRequestOptions)
    {
        validateRequest(
            request.headers["X-${config.cookieNamePrefix}-csrf"]?.first(),
            request.cookies[cookieName.csrf]?.first()?.value,
            request.headers["Origin"]?.first(),
            options
        )
    }

    private suspend fun validateRequest(
        csrfHeader: String?,
        csrfCookie: String?,
        origin: String?,
        options: ValidateRequestOptions
    )
    {

        if (options.requireTrustedOrigin)
        {
            validateOrigin(origin)
        }

        if (options.requireCsrfHeader)
        {
            validateCSRFToken(csrfCookie, csrfHeader)
        }
    }

    private suspend fun validateCSRFToken(csrfCookie: String?, csrfHeader: String?)
    {
        if (csrfCookie == null)
        {
            throw UnauthorizedException("No CSRF cookie was supplied in a POST request")
        }

        /*
          There are multiple strategies to implement CSRF protection mechanism.
          - a common simple approach is to use the value of a cookie readable from Javascript.
          Javascript frameworks such as Angular automatically replicate a specific cookie into a specific header.
          - another approach is to use a HttpOnly cookie and to return the CSRF token in the response body, so the
          SPA must explicitly store and set the CSRF header.
         */
//        val decryptedCsrf = cookieEncrypter.decryptValueFromCookie(csrfCookie)
        if (csrfCookie != csrfHeader)
        {
            throw UnauthorizedException("The CSRF header did not match the CSRF cookie in a POST request")
        }
    }

    private fun validateOrigin(origin: String?)
    {
        if (origin == null || !config.trustedWebOrigins.contains(origin))
        {
            throw UnauthorizedException("The call is from an untrusted web origin: $origin")
        }
    }


}

class ValidateRequestOptions(
    val requireTrustedOrigin: Boolean = true,
    val requireCsrfHeader: Boolean = true
)
