import type { Translations } from "./translations";

/**
 * `id` is the translation key, so a snippet without a title/description in
 * `data/translations.ts` fails to compile — no hand-maintained id map.
 */
export type SnippetId = keyof Translations["snippets"];

export type Snippet = {
  id: SnippetId;
  /** Shown in the code panel title bar. */
  file: string;
  project: string;
  projectTag: string;
  lang: string;
  code: string;
};

export const snippets: Snippet[] = [
  {
    id: "perf_middleware",
    file: "PerfTimingMiddleware.cs",
    project: "Laboratory Information System",
    projectTag: ".NET · Serilog",
    lang: "csharp",
    code: `public class PerfTimingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<PerfTimingMiddleware> _logger;

    public PerfTimingMiddleware(RequestDelegate next, ILogger<PerfTimingMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        var sw = Stopwatch.StartNew();

        try
        {
            await _next(context);
        }
        finally
        {
            sw.Stop();

            using (LogContext.PushProperty("IsPerf", true))
            {
                _logger.LogInformation(
                    "PERF | {Method} {Path} => {StatusCode} in {ElapsedMs} ms",
                    context.Request.Method,
                    context.Request.Path,
                    context.Response?.StatusCode,
                    sw.ElapsedMilliseconds);
            }
        }
    }
}`,
  },
  {
    id: "exception_handler",
    file: "UseCustomExceptionHandler.cs",
    project: "Laboratory Information System",
    projectTag: ".NET · ASP.NET Core",
    lang: "csharp",
    code: `public static class UseCustomExceptionHandler
{
    public static void UseCustomException(this IApplicationBuilder app)
    {
        app.UseExceptionHandler(config =>
        {
            config.Run(async context =>
            {
                context.Response.ContentType = "application/json";

                var exceptionFeature = context.Features.Get<IExceptionHandlerFeature>();

                var statusCode = exceptionFeature.Error switch
                {
                    ClientSideException => 400,
                    NotFoundException  => 404,
                    _                  => 500
                };

                context.Response.StatusCode = statusCode;

                var response = CustomResponseDto<NoContentDto>
                    .Fail(statusCode, exceptionFeature.Error.Message);

                await context.Response.WriteAsync(JsonSerializer.Serialize(response));
            });
        });
    }
}`,
  },
  {
    id: "autofac_module",
    file: "RepoServiceModule.cs",
    project: "Laboratory Information System",
    projectTag: ".NET · Autofac",
    lang: "csharp",
    code: `public class RepoServiceModule : Autofac.Module
{
    protected override void Load(ContainerBuilder builder)
    {
        builder.RegisterGeneric(typeof(GenericRepository<,>))
               .As(typeof(IGenericRepository<,>))
               .InstancePerLifetimeScope();

        builder.RegisterGeneric(typeof(GenericService<,,>))
               .As(typeof(IGenericService<,,>))
               .InstancePerLifetimeScope();

        builder.RegisterType<UnitOfWork>()
               .As<IUnitOfWork>()
               .InstancePerLifetimeScope();

        // Convention-based scan: suffix → interface
        var apiAssembly     = Assembly.GetExecutingAssembly();
        var repoAssembly    = Assembly.GetAssembly(typeof(AppDbContext));
        var serviceAssembly = Assembly.GetAssembly(typeof(MapProfile));

        builder.RegisterAssemblyTypes(apiAssembly, repoAssembly, serviceAssembly)
               .Where(x => x.Name.EndsWith("Repository"))
               .AsImplementedInterfaces()
               .InstancePerLifetimeScope();

        builder.RegisterAssemblyTypes(apiAssembly, repoAssembly, serviceAssembly)
               .Where(x => x.Name.EndsWith("Service"))
               .AsImplementedInterfaces()
               .InstancePerLifetimeScope();

        builder.RegisterType<LogAuditCacheService>()
               .As<ILogAuditCacheService>()
               .SingleInstance();
    }
}`,
  },
  {
    id: "jwt_token",
    file: "TokenHelper.cs",
    project: "Laboratory Information System",
    projectTag: ".NET · JWT Bearer",
    lang: "csharp",
    code: `private string CreateRefreshToken()
{
    var numberByte = new byte[32];
    using var rnd = RandomNumberGenerator.Create();
    rnd.GetBytes(numberByte);
    return Convert.ToBase64String(numberByte);
}

public async Task<TokenDto> CreateToken(User user)
{
    var accessTokenExpiration  = DateTime.Now.AddMinutes(_tokenOption.AccessTokenExpiration);
    var refreshTokenExpiration = DateTime.Now.AddMinutes(_tokenOption.RefreshTokenExpiration);
    var securityKey            = SignService.GetSymmetricSecurityKey(_tokenOption.SecurityKey);

    var signingCredentials = new SigningCredentials(
        securityKey, SecurityAlgorithms.HmacSha256Signature);

    var jwtToken = new JwtSecurityToken(
        issuer:            _tokenOption.Issuer,
        expires:           accessTokenExpiration,
        notBefore:         DateTime.Now,
        claims:            await GetClaims(user, _tokenOption.Audience),
        signingCredentials: signingCredentials);

    return new TokenDto
    {
        AccessToken            = new JwtSecurityTokenHandler().WriteToken(jwtToken),
        RefreshToken           = CreateRefreshToken(),
        AccessTokenExpiration  = accessTokenExpiration,
        RefreshTokenExpiration = refreshTokenExpiration
    };
}`,
  },
  {
    id: "can_bus",
    file: "CanBusChannel.cs",
    project: "Industrial IoT Desktop Application",
    projectTag: ".NET · Avalonia · SocketCAN",
    lang: "csharp",
    code: `// Send: stackalloc avoids a heap alloc per frame
public void Send(uint canId, ReadOnlySpan<byte> data, bool extended)
{
    if (_fd < 0) throw new InvalidOperationException("Port açık değil.");
    if (data.Length is < 0 or > 8)
        throw new ArgumentOutOfRangeException(nameof(data), "Standart CAN 0..8 bayt destekler.");

    // can_frame layout: [0..3]=id(LE), [4]=dlc, [5..7]=pad, [8..15]=payload
    Span<byte> frame = stackalloc byte[16];

    uint rawId = extended
        ? (canId & CAN_EFF_MASK) | CAN_EFF_FLAG   // J1939 / 29-bit
        : canId & CAN_SFF_MASK;                    // standard 11-bit

    BinaryPrimitives.WriteUInt32LittleEndian(frame[..4], rawId);
    frame[4] = (byte)data.Length;   // DLC
    frame.Slice(5, 3).Clear();      // padding
    data.CopyTo(frame.Slice(8));    // payload

    nint ptr = Marshal.AllocHGlobal(frame.Length);
    try
    {
        Marshal.Copy(frame.ToArray(), 0, ptr, frame.Length);
        var n = write(_fd, ptr, (nuint)frame.Length);
        if (n.ToInt64() != frame.Length) throw LastError("write");
    }
    finally { Marshal.FreeHGlobal(ptr); }
}

// Receive: blocking read, returns typed tuple
public (uint id, byte[] data, bool extended) Receive()
{
    var frame = new byte[16];
    nint ptr  = Marshal.AllocHGlobal(frame.Length);
    try
    {
        var n = read(_fd, ptr, (nuint)frame.Length);
        if (n.ToInt64() != frame.Length) throw LastError("read");

        Marshal.Copy(ptr, frame, 0, frame.Length);

        uint rawId = BinaryPrimitives.ReadUInt32LittleEndian(frame.AsSpan(0, 4));
        bool ext   = (rawId & CAN_EFF_FLAG) != 0;
        uint id    = ext ? rawId & CAN_EFF_MASK : rawId & CAN_SFF_MASK;

        int dlc    = Math.Clamp(frame[4], (byte)0, (byte)8);
        var data   = new byte[dlc];
        Buffer.BlockCopy(frame, 8, data, 0, dlc);

        return (id, data, ext);
    }
    finally { Marshal.FreeHGlobal(ptr); }
}`,
  },
  {
    id: "cqrs_handler",
    file: "GetTestResultsQuery.cs",
    project: "Laboratory Information System",
    projectTag: ".NET · MediatR · EF Core",
    lang: "csharp",
    code: `// ── Output DTO ────────────────────────────────────────────────────────
public record TestResultDto(
    int      Id,
    string   TestCode,
    string   Result,
    string   Unit,
    string   ReferenceRange,
    DateTime CollectedAt,
    bool     IsCritical);

// ── Input validator ────────────────────────────────────────────────────
public sealed class GetTestResultsValidator
    : AbstractValidator<GetTestResultsQuery>
{
    public GetTestResultsValidator()
    {
        RuleFor(x => x.PatientId).GreaterThan(0);
        RuleFor(x => x.From)
            .LessThanOrEqualTo(DateOnly.FromDateTime(DateTime.Today))
            .When(x => x.From.HasValue)
            .WithMessage("From date cannot be in the future.");
    }
}

// ── Query + Handler ────────────────────────────────────────────────────
public record GetTestResultsQuery(int PatientId, DateOnly? From)
    : IRequest<ServiceResponse<List<TestResultDto>>>;

public sealed class GetTestResultsHandler
    : IRequestHandler<GetTestResultsQuery, ServiceResponse<List<TestResultDto>>>
{
    private readonly IGenericRepository<TestResult> _results;
    private readonly IMapper _mapper;

    public GetTestResultsHandler(
        IGenericRepository<TestResult> results, IMapper mapper)
    {
        _results = results;
        _mapper  = mapper;
    }

    public async Task<ServiceResponse<List<TestResultDto>>> Handle(
        GetTestResultsQuery req, CancellationToken ct)
    {
        var query = _results
            .Where(r => r.PatientId == req.PatientId && !r.IsDeleted);

        if (req.From.HasValue)
            query = query.Where(
                r => r.CollectedAt >= req.From.Value.ToDateTime(TimeOnly.MinValue));

        var data = await query
            .OrderByDescending(r => r.CollectedAt)
            .ProjectTo<TestResultDto>(_mapper.ConfigurationProvider)
            .ToListAsync(ct);

        return ServiceResponse<List<TestResultDto>>.Success(data);
    }
}`,
  },
  {
    id: "signalr_hub",
    file: "LisHub.cs",
    project: "Laboratory Information System",
    projectTag: ".NET · SignalR · JWT",
    lang: "csharp",
    code: `// ── Typed client contract ─────────────────────────────────────────────
public interface ILisClient
{
    Task ReceiveNotification(NotificationDto notification);
    Task ResultApproved(int resultId, string approvedBy);
    Task DeviceStatusChanged(string deviceId, DeviceStatus status);
}

// ── Hub ────────────────────────────────────────────────────────────────
[Authorize]
public sealed class LisHub : Hub<ILisClient>
{
    private static readonly ConcurrentDictionary<string, string> _online = new();
    private readonly ILogger<LisHub> _logger;

    public LisHub(ILogger<LisHub> logger) => _logger = logger;

    public override async Task OnConnectedAsync()
    {
        var userId = Context.UserIdentifier!;
        _online[userId] = Context.ConnectionId;

        var group = RoleGroup(Context.User!);
        await Groups.AddToGroupAsync(Context.ConnectionId, group);

        _logger.LogDebug("Hub connect: {User} → group '{Group}'", userId, group);
        await base.OnConnectedAsync();
    }

    public override async Task OnDisconnectedAsync(Exception? ex)
    {
        _online.TryRemove(Context.UserIdentifier!, out _);
        await base.OnDisconnectedAsync(ex);
    }

    public static bool IsOnline(string userId) => _online.ContainsKey(userId);

    private static string RoleGroup(ClaimsPrincipal user)
        => user.IsInRole("Doctor") ? "doctors"
         : user.IsInRole("Lab")    ? "lab"
         : "staff";
}

// ── Server-side push service (used by domain services / handlers) ──────
public sealed class LisNotificationService
{
    private readonly IHubContext<LisHub, ILisClient> _hub;

    public LisNotificationService(IHubContext<LisHub, ILisClient> hub)
        => _hub = hub;

    public Task NotifyRoleAsync(string role, NotificationDto dto)
        => _hub.Clients.Group(role).ReceiveNotification(dto);

    public Task NotifyUserAsync(string userId, NotificationDto dto)
        => _hub.Clients.User(userId).ReceiveNotification(dto);

    public Task BroadcastDeviceStatusAsync(string deviceId, DeviceStatus status)
        => _hub.Clients.All.DeviceStatusChanged(deviceId, status);
}`,
  },
  {
    id: "erp_worker",
    file: "ErpSyncWorker.cs",
    project: "ERP Integration Service",
    projectTag: ".NET · Worker Service · Serilog",
    lang: "csharp",
    code: `public sealed class ErpSyncWorker : BackgroundService
{
    private readonly IServiceScopeFactory _factory;
    private readonly ILogger<ErpSyncWorker> _logger;
    private static readonly TimeSpan _period = TimeSpan.FromMinutes(15);

    public ErpSyncWorker(IServiceScopeFactory factory, ILogger<ErpSyncWorker> logger)
    {
        _factory = factory;
        _logger  = logger;
    }

    protected override async Task ExecuteAsync(CancellationToken ct)
    {
        _logger.LogInformation("ERP sync worker started — interval {Min} min",
            _period.TotalMinutes);

        await using var timer = new PeriodicTimer(_period);

        while (await timer.WaitForNextTickAsync(ct))
        {
            try
            {
                await using var scope = _factory.CreateAsyncScope();
                var svc = scope.ServiceProvider
                               .GetRequiredService<IErpSyncService>();

                var sw      = Stopwatch.StartNew();
                var synced  = await svc.SyncPendingAsync(ct);

                _logger.LogInformation(
                    "ERP sync OK — {Count} records in {Ms} ms",
                    synced, sw.ElapsedMilliseconds);
            }
            catch (Exception ex) when (ex is not OperationCanceledException)
            {
                _logger.LogError(ex,
                    "ERP sync failed — next attempt in {Min} min",
                    _period.TotalMinutes);
            }
        }
    }
}`,
  },
  {
    id: "quartz_job",
    file: "VisitorSyncJob.cs",
    project: "Access Management Platform",
    projectTag: ".NET · Quartz.NET · SmartID",
    lang: "csharp",
    code: `[DisallowConcurrentExecution]
public sealed class VisitorSyncJob : IJob
{
    private readonly IVisitorRepository _visitors;
    private readonly ISmartIdService    _smartId;
    private readonly ILogger<VisitorSyncJob> _logger;

    public VisitorSyncJob(
        IVisitorRepository visitors,
        ISmartIdService smartId,
        ILogger<VisitorSyncJob> logger)
    {
        _visitors = visitors;
        _smartId  = smartId;
        _logger   = logger;
    }

    public async Task Execute(IJobExecutionContext context)
    {
        var ct      = context.CancellationToken;
        var pending = await _visitors.GetPendingSyncAsync(ct);

        if (pending.Count == 0) return;

        int ok = 0, fail = 0;

        foreach (var visitor in pending)
        {
            try
            {
                var result = await _smartId.VerifyAsync(visitor.NationalId, ct);
                visitor.MarkVerified(result.Status, DateTime.UtcNow);
                ok++;
            }
            catch (SmartIdException ex)
            {
                visitor.MarkFailed(ex.Message);
                fail++;
                _logger.LogWarning(
                    "SmartID verify failed for visitor {Id}: {Msg}",
                    visitor.Id, ex.Message);
            }
        }

        await _visitors.SaveChangesAsync(ct);
        _logger.LogInformation(
            "Visitor sync complete — {Ok} verified, {Fail} failed", ok, fail);
    }
}`,
  },
  {
    id: "permission_auth",
    file: "PermissionAuthorization.cs",
    project: "Laboratory Information System",
    projectTag: ".NET · ASP.NET Core · JWT",
    lang: "csharp",
    code: `// ── Permission catalogue ──────────────────────────────────────────────
public enum Permission
{
    ViewPatient, CreateSample, EditSample,
    ApproveResult, RejectResult,
    ManageDevices, ManageUsers, ViewReports
}

// ── Attribute ─────────────────────────────────────────────────────────
[AttributeUsage(AttributeTargets.Method | AttributeTargets.Class)]
public sealed class RequirePermissionAttribute : AuthorizeAttribute
{
    public RequirePermissionAttribute(Permission permission)
        : base(policy: permission.ToString()) { }
}

// ── Requirement + Handler ──────────────────────────────────────────────
public record PermissionRequirement(Permission Permission)
    : IAuthorizationRequirement;

public sealed class PermissionHandler
    : AuthorizationHandler<PermissionRequirement>
{
    protected override Task HandleRequirementAsync(
        AuthorizationHandlerContext context,
        PermissionRequirement        requirement)
    {
        var granted = context.User
            .FindAll(AppClaims.Permission)
            .Any(c => c.Value == requirement.Permission.ToString());

        if (granted) context.Succeed(requirement);
        return Task.CompletedTask;
    }
}

// ── Startup registration ───────────────────────────────────────────────
services.AddSingleton<IAuthorizationHandler, PermissionHandler>();
services.AddAuthorization(options =>
{
    foreach (var perm in Enum.GetValues<Permission>())
        options.AddPolicy(perm.ToString(),
            p => p.AddRequirements(new PermissionRequirement(perm)));
});

// ── Controller usage ───────────────────────────────────────────────────
[HttpPost("{id}/approve")]
[RequirePermission(Permission.ApproveResult)]
public async Task<IActionResult> Approve(int id, CancellationToken ct)
{
    var result = await _mediator.Send(new ApproveResultCommand(id), ct);
    return result.IsSuccess ? Ok(result) : BadRequest(result);
}`,
  },
  {
    id: "request_response_log",
    file: "RequestLoggingMiddleware.cs",
    project: "Laboratory Information System",
    projectTag: ".NET · ASP.NET Core · Serilog",
    lang: "csharp",
    code: `// ── Options ───────────────────────────────────────────────────────────
public sealed class RequestLoggingOptions
{
    public HashSet<string> MaskedHeaders { get; init; } =
        ["Authorization", "Cookie", "X-Api-Key"];
    public HashSet<string> SkipPaths { get; init; } =
        ["/health", "/metrics", "/favicon.ico"];
}

// ── Middleware ─────────────────────────────────────────────────────────
public sealed class RequestResponseLoggingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<RequestResponseLoggingMiddleware> _logger;
    private readonly RequestLoggingOptions _opts;

    public RequestResponseLoggingMiddleware(
        RequestDelegate next,
        ILogger<RequestResponseLoggingMiddleware> logger,
        IOptions<RequestLoggingOptions> opts)
    {
        _next   = next;
        _logger = logger;
        _opts   = opts.Value;
    }

    public async Task InvokeAsync(HttpContext ctx)
    {
        if (_opts.SkipPaths.Contains(ctx.Request.Path.Value ?? ""))
        {
            await _next(ctx); return;
        }

        var traceId  = Activity.Current?.TraceId.ToString() ?? ctx.TraceIdentifier;
        var userId   = ctx.User.FindFirstValue(ClaimTypes.NameIdentifier) ?? "-";

        var original = ctx.Response.Body;
        using var buffer = new MemoryStream();
        ctx.Response.Body = buffer;

        var sw = Stopwatch.StartNew();
        try   { await _next(ctx); }
        finally
        {
            sw.Stop();
            buffer.Position = 0;
            await buffer.CopyToAsync(original);
            ctx.Response.Body = original;

            using (LogContext.PushProperty("TraceId", traceId))
            using (LogContext.PushProperty("UserId",  userId))
            {
                _logger.LogInformation(
                    "HTTP {Method} {Path} → {Status} in {Ms} ms | {Bytes} B",
                    ctx.Request.Method,
                    ctx.Request.Path,
                    ctx.Response.StatusCode,
                    sw.ElapsedMilliseconds,
                    buffer.Length);
            }
        }
    }
}

// ── Extension ─────────────────────────────────────────────────────────
public static class RequestLoggingExtensions
{
    public static IApplicationBuilder UseRequestResponseLogging(
        this IApplicationBuilder app)
        => app.UseMiddleware<RequestResponseLoggingMiddleware>();
}`,
  },
];
